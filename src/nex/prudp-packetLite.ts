import crypto from 'node:crypto';
import ByteStream from '@/byte-stream';
import PRUDPPacket from '@/nex/prudp-packet';
import RMCMessage from '@/nex/rmc-message';
import type { SerializedMessage } from '@/types/serialized-message';

export default class PRUDPPacketLite extends PRUDPPacket {
	public readonly version = 2;

	private optionsLength!: number;
	private payloadLength!: number;
	private supportedFunctions?: Buffer;
	public liteSignature?: Buffer;

	static Magic = Buffer.from([0x80]);

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const start = this.stream.pos();
		const magic = this.stream.readBytes(0x1);

		if (!magic.equals(PRUDPPacketLite.Magic)) {
			throw new Error('Invalid PRUDPLite magic');
		}

		this.optionsLength = this.stream.readUInt8();
		this.payloadLength = this.stream.readUInt16LE();

		const streamTypes = this.stream.readUInt8();

		this.sourceStreamType = streamTypes >> 4;
		this.destinationStreamType = streamTypes & 0x0F;
		this.sourceStreamID = this.stream.readUInt8();
		this.destinationStreamID = this.stream.readUInt8();
		this.fragmentID = this.stream.readUInt8();

		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sequenceID = this.stream.readUInt16LE();

		this.parseOptions();
		this.payload = this.stream.readBytes(this.payloadLength);

		const end = this.stream.pos();
		const bytesRead = end - start;

		this.stream.seek(start);

		this.originalBuffer = this.stream.readBytes(bytesRead);
	}

	private parseOptions(): void {
		const optionsStream = new ByteStream(this.stream.readBytes(this.optionsLength));

		while (optionsStream.hasDataLeft()) {
			const optionID = optionsStream.readUInt8();
			const optionSize = optionsStream.readUInt8();

			if (optionID !== 0 && optionID !== 1 && optionID !== 0x80) {
				throw new Error('Invalid PRUDPLite option ID');
			}

			if (optionID === 0) {
				if (!this.isTypeSyn() && !this.isTypeConnect()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 1) {
				if (!this.isTypeSyn()) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				if (!this.hasFlagAck()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 0x80) {
				if (!this.isTypeConnect()) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				if (this.hasFlagAck()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 0) {
				if (optionSize !== 4) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.supportedFunctions = optionsStream.readBytes(optionSize);
			}

			if (optionID === 1) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.connectionSignature = optionsStream.readBytes(optionSize);
			}

			if (optionID === 0x80) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.liteSignature = optionsStream.readBytes(optionSize);
			}
		}
	}

	public calculateSignature(accessKey: string, connectionSignature: Buffer): Buffer {
		const accessKeyBytes = Buffer.from(accessKey);

		const accessKeySum = accessKeyBytes.reduce((sum, byte) => sum + byte, 0);
		const accessKeySumBytes = Buffer.alloc(4);
		accessKeySumBytes.writeUInt32LE(accessKeySum, 0);

		const key = crypto.createHash('md5').update(accessKeyBytes).digest();
		const mac = crypto.createHmac('md5', key);

		mac.update(key);
		mac.update(connectionSignature);

		return mac.digest();
	}

	public toJSON(): SerializedMessage {
		return {
			id: this.id,
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
							value: 'PRUDPLite'
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
							name: 'Substream ID',
							value: `${this.substreamID!}`
						},
						{
							name: 'Fragment ID',
							value: `${this.fragmentID!}`
						}
					]
				},
				{
					title: 'PRUDPLite Optional Data',
					columns: 2,
					fields: [
						...(this.supportedFunctions !== undefined
							? [{
									name: 'Supported Functions',
									value: `${this.supportedFunctions.join(', ')}`
								}]
							: []),
						...(this.connectionSignature !== undefined
							? [{
									name: 'Connection Signature',
									value: this.connectionSignature.toString('hex')
								}]
							: []),
						...(this.liteSignature !== undefined
							? [{
									name: 'Lite Signature',
									value: this.liteSignature.toString('hex')
								}]
							: [])
					]
				}
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
