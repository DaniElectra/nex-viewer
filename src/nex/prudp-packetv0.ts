import PRUDPPacket from '@/nex/prudp-packet';
import RMCMessage from '@/nex/rmc-message';
import type ByteStream from '@/byte-stream';
import type { SerializedMessage } from '@/types/serialized-message';

export default class PRUDPPacketV0 extends PRUDPPacket {
	public readonly version = 0;

	private _checksum!: number;
	private packetData!: Buffer; // * Used for the checksum calculation

	public get checksum(): number {
		return this._checksum;
	}

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const start = this.stream.pos();

		const source = this.stream.readUInt8();
		const destination = this.stream.readUInt8();

		this.sourceStreamType = source >> 4;
		this.sourceStreamID = source & 0xF;
		this.destinationStreamType = destination >> 4;
		this.destinationStreamID = destination & 0xF;

		// TODO - Quazal encoding? How do we tell the decoder the size BEFORE decoding?
		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sessionID = this.stream.readUInt8();
		this.signature = this.stream.readBytes(0x4);
		this.sequenceID = this.stream.readUInt16LE();

		if (this.isTypeSyn() || this.isTypeConnect()) {
			this.connectionSignature = this.stream.readBytes(0x4);
		}

		if (this.isTypeData()) {
			this.fragmentID = this.stream.readUInt8();
		}

		let payloadSize = 0;

		if (this.hasFlagHasSize()) {
			payloadSize = this.stream.readUInt16LE();
		} else {
			payloadSize = this.stream.remaining() - 1;
		}

		if (payloadSize > (this.stream.remaining() - 1)) {
			throw new Error(`Packet payload too large. Payload space left is ${this.stream.remaining() - 1}, got ${payloadSize}`);
		}

		this.payload = this.stream.readBytes(payloadSize);

		let end = this.stream.pos();

		this.stream.seek(start);
		this.packetData = this.stream.read(end - start);

		// TODO - Quazal encoding? How do we tell the decoder the size BEFORE decoding?
		// TODO - Validate this
		this._checksum = this.stream.readUInt8();

		end = this.stream.pos();
		const bytesRead = end - start;

		this.stream.seek(start);

		this.originalBuffer = this.stream.readBytes(bytesRead);
	}

	public calculateChecksum(key: string): number {
		let checksum = Buffer.from(key).reduce((sum, byte) => sum + byte, 0);

		const data = this.packetData;

		const numWords = Math.floor(data.length / 4);
		const words: number[] = [];

		for (let i = 0; i < numWords; i++) {
			words.push(data.readUInt32LE(i * 4));
		}

		const temp = words.reduce((sum, byte) => sum + byte, 0) >>> 0; // * Truncate to 32-bit integer

		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(temp);

		checksum = checksum + data.subarray(data.length & ~3).reduce((sum, byte) => sum + byte, 0) + buffer.reduce((sum, byte) => sum + byte, 0);

		return checksum & 0xFF;
	}

	public toJSON(): SerializedMessage {
		return {
			id: -1, // * Gets set later when emitted
			elapsed_time: this.elapsedTime ?? 0,
			transport: 'NEX', // TODO - p2p packets should change this
			source: `${this.sourceAddress}:${this.sourcePort}`,
			destination: `${this.destinationAddress}:${this.destinationPort}`,
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
							value: 'PRUDPv0'
						},
						{
							name: 'Source',
							value: `${this.sourceAddress}:${this.sourcePort}`
						},
						{
							name: 'Destination',
							value: `${this.destinationAddress}:${this.destinationPort}`
						},
						{
							name: 'Source Stream Type',
							value: this.serializeStreamType(this.sourceStreamType)
						},
						{
							name: 'Source Stream ID',
							value: `${this.sourceStreamID}`
						},
						{
							name: 'Destination Stream Type',
							value: this.serializeStreamType(this.destinationStreamType)
						},
						{
							name: 'Destination Stream ID',
							value: `${this.destinationStreamID}`
						},
						{
							name: 'Packet Type',
							value: this.serializeType()
						},
						{
							name: 'Packet Flags',
							value: this.serializeFlags().join(', ')
						},
						{
							name: 'Session ID',
							value: `${this.sessionID}`
						},
						{
							name: 'Sequence ID',
							value: `${this.sequenceID}`
						},
						{
							name: 'Signature',
							value: this.signature.toString('hex')
						},
						{
							name: 'Checksum',
							value: `${this.checksum}`
						}
					]
				},
				{
					title: 'PRUDPv0 Optional Data',
					columns: 2,
					fields: [
						...(this.connectionSignature !== undefined
							? [{
									name: 'Connection Signature',
									value: this.connectionSignature.toString('hex')
								}]
							: []),
						...(this.fragmentID !== undefined
							? [{
									name: 'Fragment ID',
									value: `${this.fragmentID}`
								}]
							: [])
					]
				},
				...(this.natMessageID !== undefined || this.natConnectionID !== undefined || this.natTime !== undefined
					? [{
							title: 'NAT Data',
							columns: 2,
							fields: [
								...(this.natMessageID !== undefined
									? [{
											name: 'NAT Message ID',
											value: `${this.natMessageID}`
										}]
									: []),
								...(this.natConnectionID !== undefined
									? [{
											name: 'NAT Connection ID',
											value: `${this.natConnectionID}`
										}]
									: []),
								...(this.natTime !== undefined
									? [{
											name: 'NAT Time Counter',
											value: `${this.natTime}`
										}]
									: [])
							]
						}]
					: [])
			],
			hex_views: [
				{
					title: 'Packet',
					bytes: [...this.originalBuffer.values()]
				},
				...(this.decryptedPayload !== undefined
					? [{
							title: 'Decrypted Payload',
							bytes: [...this.decryptedPayload.values()]
						}]
					: []),
				...(this.defragmentedPayload !== undefined
					? [{
							title: 'Defragmented Payload',
							bytes: [...this.defragmentedPayload.values()]
						}]
					: [])
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
