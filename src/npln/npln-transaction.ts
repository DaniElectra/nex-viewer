import path from 'node:path';
import { app } from 'electron';
import { glob } from 'glob';
import protobuf from 'protobufjs';
import type { ProxideTransaction } from '@/proxide-parser';
import type { SerializedMessage } from '@/types/serialized-message';

// TODO - I'm just slapping this all into one huge file for now, organize it better later. I am open to changing ALL OF THIS

const PROTO_ROOT = path.join(app.getAppPath(), 'src/npln/protobufs/latest'); // TODO - I doubt this will work when packaged, this is a hack
const root = new protobuf.Root();

root.resolvePath = function (_origin, target): string | null {
	return path.resolve(PROTO_ROOT, target); // * Needed to process relative imports correctly
};

const protobufs = root.loadSync(glob.sync('proto/**/*.proto', {
	cwd: PROTO_ROOT,
	absolute: true
}));

// TODO - Move to types folder
export interface NPLNMessage {
	headers: Record<string, string>;
	body: Buffer;
	messages?: any[]; // TODO - Better type this
}

// TODO - Move to types folder
export interface SerializedNPLNMessage {
	headers: Record<string, string>;
	body: number[];
	messages: any[]; // TODO - Better type this
}

// TODO - Move to types folder
export interface SerializedNPLNTransaction {
	uri: string;
	package_name: string;
	service_name: string;
	method_name: string;
	method_path: string;
	fully_qualified_service_name: string;
	request: SerializedNPLNMessage;
	response: SerializedNPLNMessage;
}

function parseGRPCFrames(buffer: Buffer): Buffer[] {
	const frames: Buffer[] = [];
	let offset = 0;

	while (offset < buffer.length) {
		if (offset + 5 > buffer.length) {
			break;
		}

		// TODO - Assumes uncompressed. Check that
		const length = buffer.readUInt32BE(offset + 1);
		offset += 5;

		if (offset + length > buffer.length) {
			break;
		}

		frames.push(buffer.slice(offset, offset + length));
		offset += length;
	}

	return frames;
}

function transformValue(field: protobuf.Field, repeated: boolean, value: any): any {
	if (repeated) {
		return {
			__displayTypeName: `List<${field.type}>`,
			__typeName: 'List',
			__value: value.map((v: any) => transformValue(field, false, v))
		};
	}

	switch (field.type) {
		case 'string':
			return { __displayTypeName: 'String', __typeName: 'String', __value: value };
		case 'bool':
			return { __displayTypeName: 'Boolean', __typeName: 'Boolean', __value: value };
		case 'int32': case 'sint32': case 'uint32': case 'fixed32': case 'sfixed32':
			return { __displayTypeName: 'Int32', __typeName: 'Int32', __value: value };
		case 'int64': case 'sint64': case 'uint64': case 'fixed64': case 'sfixed64':
			return { __displayTypeName: 'Int64', __typeName: 'Int64', __value: value.toString() };
		case 'float':
			return { __displayTypeName: 'Float', __typeName: 'Float', __value: value };
		case 'double':
			return { __displayTypeName: 'Double', __typeName: 'Double', __value: value };
		case 'bytes':
			return { __displayTypeName: 'Buffer', __typeName: 'Buffer', __value: Array.from(value) };
	}

	const resolvedType = (field as any).resolvedType as protobuf.Type | protobuf.Enum | null;

	if (resolvedType instanceof protobuf.Enum) {
		const enumName = resolvedType.valuesById[value] ?? value;
		return { __displayTypeName: resolvedType.name, __typeName: resolvedType.name, __value: enumName };
	}

	if (resolvedType instanceof protobuf.Type) {
		return transformMessage(resolvedType, value);
	}

	return { __displayTypeName: field.type, __typeName: field.type, __value: value };
}

function transformMessage(msgType: protobuf.Type, value: any): any {
	if (msgType.fullName === '.google.protobuf.Timestamp') {
		return {
			__displayTypeName: 'Timestamp',
			__typeName: 'Timestamp',
			__fields: {
				seconds: { __displayTypeName: 'Int64', __typeName: 'Int64', __value: value.seconds?.toString() ?? '0' },
				nanos: { __displayTypeName: 'Int32', __typeName: 'Int32', __value: value.nanos ?? 0 }
			}
		};
	}

	if (msgType.fullName === '.google.protobuf.NullValue') {
		return { __displayTypeName: 'Null', __typeName: 'Null', __value: null };
	}

	const oneofActiveField = new Map<string, string>();
	const activeOneofCase = new Map<string, string>();

	for (const oneof of msgType.oneofsArray) {
		const activeField = value[oneof.name] as string | undefined;
		if (activeField) {
			activeOneofCase.set(oneof.name, activeField);
		}
		for (const field of oneof.fieldsArray) {
			oneofActiveField.set(field.name, oneof.name);
		}
	}

	const fields: Record<string, any> = {};

	for (const field of msgType.fieldsArray) {
		field.resolve();

		const oneofName = oneofActiveField.get(field.name);
		if (oneofName !== undefined && activeOneofCase.get(oneofName) !== field.name) {
			continue;
		}

		const raw = value[field.name];
		if (raw == null) {
			continue;
		}

		if (field instanceof protobuf.MapField) {
			const entries: Record<string, any> = {};
			for (const [k, v] of Object.entries(raw)) {
				entries[k] = transformValue(field, false, v);
			}
			fields[field.name] = {
				__displayTypeName: `Map<${field.keyType}, ${field.type}>`,
				__typeName: 'Map',
				__value: entries
			};
			continue;
		}

		fields[field.name] = transformValue(field, field.repeated, raw);
	}

	const result: any = {
		__displayTypeName: msgType.name,
		__typeName: msgType.name,
		__fields: fields
	};

	if (activeOneofCase.size > 0) {
		result.__oneofCases = Object.fromEntries(activeOneofCase);
	}

	return result;
}

export default class NPLNTransaction {
	public uri!: string;
	public packageName!: string;
	public serviceName!: string;
	public methodName!: string;
	public methodPath!: string;
	public fullyQualifiedServiceName!: string;
	public request!: NPLNMessage;
	public response!: NPLNMessage;

	public decode(): void {
		const service = protobufs.lookupService(this.fullyQualifiedServiceName);
		const method = service.methods[this.methodName];

		method.resolve();

		const requestType = method.resolvedRequestType!;
		const responseType = method.resolvedResponseType!;

		this.request.messages = parseGRPCFrames(this.request.body).map(frame => requestType.decode(frame));
		this.response.messages = parseGRPCFrames(this.response.body).map(frame => responseType.decode(frame));
	}

	public transform(): { requests: any[]; responses: any[] } {
		const service = protobufs.lookupService(this.fullyQualifiedServiceName);
		const method = service.methods[this.methodName];

		method.resolve();

		const requestType = method.resolvedRequestType!;
		const responseType = method.resolvedResponseType!;

		return {
			requests: parseGRPCFrames(this.request.body).map(frame => transformMessage(requestType, requestType.decode(frame)).__fields),
			responses: parseGRPCFrames(this.response.body).map(frame => transformMessage(responseType, responseType.decode(frame)).__fields)
		};
	}

	public static parseFromProxideTransaction(proxideTransaction: ProxideTransaction): NPLNTransaction {
		const transaction = new NPLNTransaction();
		const url = new URL(proxideTransaction.uri);
		const methodPath = url.pathname;
		const [, fullyQualifiedServiceName, methodName] = methodPath.split('/');
		const lastDot = fullyQualifiedServiceName.lastIndexOf('.');

		transaction.uri = proxideTransaction.uri;
		transaction.packageName = fullyQualifiedServiceName.substring(0, lastDot);
		transaction.serviceName = fullyQualifiedServiceName.substring(lastDot + 1);
		transaction.methodName = methodName;
		transaction.methodPath = methodPath;
		transaction.fullyQualifiedServiceName = fullyQualifiedServiceName;
		transaction.request = {
			headers: proxideTransaction.requestHeaders,
			body: proxideTransaction.requestBody
		};
		transaction.response = {
			headers: proxideTransaction.responseHeaders,
			body: proxideTransaction.responseBody
		};

		transaction.decode();

		return transaction;
	}

	public toJSON(): SerializedMessage {
		const transformed = this.transform(); // TODO - Update this to set the display type names to include the full name, with the package and such
		const url = new URL(this.uri);

		return {
			id: -1, // * Gets set later when emitted
			elapsed_time: 0, // TODO - Add this
			transport: 'NPLN', // TODO - p2p packets should change this
			source: 'Client', // TODO - Change this
			destination: `${url.protocol}//${url.hostname}`,
			service: this.fullyQualifiedServiceName,
			method: this.methodName,
			overview_sections: [
				{
					title: 'General',
					columns: 2,
					fields: [
						{
							name: 'URI',
							value: this.uri
						},
						{
							name: 'Package',
							value: this.packageName
						},
						{
							name: 'Service',
							value: this.serviceName
						},
						{
							name: 'Method',
							value: this.methodName
						},
						{
							name: 'Method Path',
							value: this.methodPath
						}

						// TODO - Add other data like headers and such
					]
				}
			],
			hex_views: [
				{
					title: 'Request Body',
					bytes: [...this.request.body.values()]
				},
				{
					title: 'Response Body',
					bytes: [...this.response.body.values()]
				}
			],
			serialized_tabs: [
				{
					title: 'Request',
					fields: transformed.requests.map((request, i) => ({
						name: transformed.requests.length === 1 ? 'Message' : `Message ${i + 1}`,
						data: {
							__displayTypeName: 'Parameters',
							__fields: request
						}
					}))
				},
				{
					title: 'Response',
					fields: transformed.responses.map((response, i) => ({
						name: transformed.responses.length === 1 ? 'Message' : `Message ${i + 1}`,
						data: {
							__displayTypeName: 'Parameters',
							__fields: response
						}
					}))
				}
			]
		};
	}
}
