import PRUDPPacket from '@/nex/prudp-packet';
import RMCMessage from '@/nex/rmc-message';
import type ByteStream from '@/byte-stream';
import type { SerializedMessage } from '@/types/serialized-message';

export default class RawRMCPacket extends PRUDPPacket {
	public readonly version = -1;

	public titleID!: string;

	constructor(stream: ByteStream) {
		super(stream);

		this.parse();
	}

	private parse(): void {
		const start = this.stream.pos();
		const version = this.stream.readUInt8();

		if (version !== 1) {
			throw new Error('Bad HokakuCTR version');
		}

		this.titleID = this.stream.readUInt64LE().toString(16).toUpperCase().padStart(16, '0');
		this.flags = this.stream.readUInt8();
		this.payload = this.stream.readRest();

		if (this.payload[0x4] === 0) {
			// * Invalid protocol ID. Likely a Net-Z packet
			throw new Error('Invalid raw RMC packet');
		}

		const end = this.stream.pos();
		const bytesRead = end - start;

		this.stream.seek(start);

		this.originalBuffer = this.stream.readBytes(bytesRead);
		this.decryptedPayload = this.payload;
		this.type = PRUDPPacket.TYPES.DATA; // TODO - Is this a good assumption?
		this.fragmentID = 0; // TODO - Is this a good assumption?
		this.substreamID = 0; // TODO - Is this a good assumption?

		this.fromServerToClient = (this.flags & 0b00000001) !== 0;
		this.fromClientToServer = !this.fromServerToClient;

		this.sourceAddress = this.fromServerToClient ? 'server' : 'client';
		this.sourcePort = -1;
		this.sourceStreamType = -1;
		this.sourceStreamID = -1;

		this.destinationAddress = this.fromServerToClient ? 'client' : 'server';
		this.destinationPort = -1;
		this.destinationStreamType = -1;
		this.destinationStreamID = -1;
	}

	public toJSON(): SerializedMessage {
		return {
			id: this.id,
			elapsed_time: this.elapsedTime ?? 0,
			transport: 'RMC',
			source: this.sourceAddress,
			destination: this.destinationAddress,
			service: this.message ? this.message.protocolName : undefined,
			method: this.message ? this.message.methodName : this.serializeType(),
			direction: this.message ? this.message.type === RMCMessage.REQUEST ? 'REQUEST' : 'RESPONSE' : undefined,
			status: this.message ? this.message.error ? `${this.message.error.name} (0x${this.message.error.code!.toString(16)})` : 'SUCCESS' : undefined,
			overview_sections: [
				{
					title: 'General',
					columns: 2,
					fields: [
						{
							name: 'Elapsed Time',
							value: this.elapsedTime?.toFixed(6) ?? ''
						},
						{
							name: 'Protocol',
							value: 'HokakuCTR Raw RMC'
						},
						{
							name: 'Source',
							value: this.sourceAddress
						},
						{
							name: 'Destination',
							value: this.destinationAddress
						},
						{
							name: 'Title ID',
							value: `${this.titleID}`
						}
					]
				}
			],
			hex_views: [
				{
					title: 'Packet',
					bytes: [...this.originalBuffer.values()]
				},
				{
					title: 'Decrypted Payload',
					bytes: [...this.decryptedPayload!.values()]
				}
			],
			serialized_tabs: this.message
				? [
						{
							title: 'RMC',
							subtitle: `Protocol: ${this.message.protocolName || 'Unknown'}, Method: ${this.message.methodName || 'Unknown'}`,
							fields: [
								{
									name: 'RMC Header',
									data: {
										__displayTypeName: 'Header',
										__fields: {
											type: {
												__displayTypeName: 'UInt8',
												__value: this.message.type
											},
											protocol_id: {
												__displayTypeName: 'UInt8',
												__value: this.message.protocolID
											},
											protocol_name: {
												__displayTypeName: 'String',
												__value: this.message.protocolName
											},
											method_id: {
												__displayTypeName: 'UInt8',
												__value: this.message.methodID
											},
											method_name: {
												__displayTypeName: 'String',
												__value: this.message.methodName
											},
											call_id: {
												__displayTypeName: 'UInt32',
												__value: this.message.callID
											}
										}
									}
								},
								{
									name: 'Parameters',
									data: {
										__displayTypeName: 'Parameters',
										__fields: this.message.toJSON().parameters
									}
								}
							]
						}
					]
				: [],
			stack_trace: this.stackTrace
		};
	}
}
