import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFetchMyInfosParam';

export default class DataStoreFetchMyInfosParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private balloonDataTypes = new List(new UInt16());
	private additionalOperation = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.balloonDataTypes.extractFrom(stream);
		this.additionalOperation.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.balloonDataTypes = this.balloonDataTypes;
		json.__fields.additionalOperation = this.additionalOperation;

		return json;
	}
}
