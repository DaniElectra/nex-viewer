import crypto from 'node:crypto';
import ByteStream from '@/byte-stream';
import PRUDPPacket from '@/nex/prudp-packet';
import RMCMessage from '@/nex/rmc-message';
import type { SerializedMessage } from '@/types/serialized-message';

export default class PRUDPPacketV1 extends PRUDPPacket {
	public readonly version = 1;

	private optionsLength!: number;
	private payloadLength!: number;
	private headerBytes!: Buffer; // * Used for the signature calculation
	private optionsBytes!: Buffer; // * Used for the signature calculation
	private supportedFunctions?: Buffer;
	private initialUnreliableSequenceID?: number;
	private maximumSubstreamID?: number;

	static Magic = Buffer.from([0xEA, 0xD0]);

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const start = this.stream.pos();
		const magic = this.stream.readBytes(0x2);

		if (!magic.equals(PRUDPPacketV1.Magic)) {
			throw new Error('Invalid PRUDPv1 magic');
		}

		this.parseHeader();
		this.signature = this.stream.readBytes(0x10);
		this.parseOptions();
		this.payload = this.stream.readBytes(this.payloadLength);

		const end = this.stream.pos();
		const bytesRead = end - start;

		this.stream.seek(start);

		this.originalBuffer = this.stream.readBytes(bytesRead);
	}

	private parseHeader(): void {
		this.headerBytes = this.stream.read(0xC);
		this.stream.skip(-0xC);

		const version = this.stream.readUInt8();

		if (version !== 1) {
			throw new Error('Invalid PRUDPv1 version');
		}

		this.optionsLength = this.stream.readUInt8();
		this.payloadLength = this.stream.readUInt16LE();

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
		this.substreamID = this.stream.readUInt8();
		this.sequenceID = this.stream.readUInt16LE();
	}

	private parseOptions(): void {
		this.optionsBytes = this.stream.read(this.optionsLength);
		this.stream.skip(-this.optionsLength);

		const optionsStream = new ByteStream(this.stream.readBytes(this.optionsLength));

		while (optionsStream.hasDataLeft()) {
			const optionID = optionsStream.readUInt8();
			const optionSize = optionsStream.readUInt8();

			if (optionID > 4) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 0 || optionID === 1 || optionID === 4) {
				if (!this.isTypeSyn() && !this.isTypeConnect()) {
					throw new Error('Invalid PRUDPv1 option ID');
				}
			}

			if (optionID === 2 && !this.isTypeData()) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 3 && !this.isTypeConnect()) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 0) {
				if (optionSize !== 4) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.supportedFunctions = optionsStream.readBytes(optionSize);
			}

			if (optionID === 1) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.connectionSignature = optionsStream.readBytes(optionSize);
			}

			if (optionID === 2) {
				if (optionSize !== 1) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.fragmentID = optionsStream.readUInt8();
			}

			if (optionID === 3) {
				if (optionSize !== 2) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.initialUnreliableSequenceID = optionsStream.readUInt16LE();
			}

			if (optionID === 4) {
				if (optionSize !== 1) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.maximumSubstreamID = optionsStream.readUInt8();
			}
		}
	}

	public calculateSignature(accessKey: string, sessionKey: Buffer, connectionSignature: Buffer): Buffer {
		const accessKeyBytes = Buffer.from(accessKey);

		const accessKeySum = accessKeyBytes.reduce((sum, byte) => sum + byte, 0);
		const accessKeySumBytes = Buffer.alloc(4);
		accessKeySumBytes.writeUInt32LE(accessKeySum, 0);

		const key = crypto.createHash('md5').update(accessKeyBytes).digest();
		const mac = crypto.createHmac('md5', key);

		mac.update(this.headerBytes.subarray(4));
		mac.update(sessionKey);
		mac.update(accessKeySumBytes);
		mac.update(connectionSignature);
		mac.update(this.optionsBytes);

		if (this.payload) {
			mac.update(this.payload);
		}

		return mac.digest();
	}

	public toJSON(): SerializedMessage {
		return {
			id: this.id,
			elapsed_time: this.elapsedTime ?? 0,
			transport: this.isNetZ() ? 'NetZ' : 'NEX', // * NEX is the larger library that houses NetZ, but NetZ is for P2P connections and is also different than PIA
			source: `${this.sourceAddress}:${this.sourcePort}`,
			destination: `${this.destinationAddress}:${this.destinationPort}`,
			service: this.message ? this.message.protocolName : undefined,
			method: this.message ? this.message.methodName : this.serializeType(),
			direction: this.message ? this.message.type === RMCMessage.REQUEST ? 'REQUEST' : 'RESPONSE' : undefined,
			status: this.message ? this.message.error ? this.message.error.name() : 'SUCCESS' : undefined,
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
							value: 'PRUDPv1'
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
							name: 'Signature',
							value: this.signature.toString('hex')
						}
					]
				},
				{
					title: 'PRUDPv1 Optional Data',
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
						...(this.fragmentID !== undefined
							? [{
									name: 'Fragment ID',
									value: `${this.fragmentID}`
								}]
							: []),
						...(this.initialUnreliableSequenceID !== undefined
							? [{
									name: 'Initial Unreliable Sequence ID',
									value: `${this.initialUnreliableSequenceID}`
								}]
							: []),
						...(this.maximumSubstreamID !== undefined
							? [{
									name: 'Maximum Substream ID',
									value: `${this.maximumSubstreamID}`
								}]
							: [])
					]
				},
				...(this.isStreamTypeNAT()
					? [{
							title: 'NAT Data',
							columns: 2,
							fields: [
								{
									name: 'NAT Message ID',
									value: `${this.natMessageID}`
								},
								{
									name: 'NAT Connection ID',
									value: `${this.natConnectionID}`
								},
								{
									name: 'NAT Time Counter',
									value: `${this.natTime}`
								}
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
