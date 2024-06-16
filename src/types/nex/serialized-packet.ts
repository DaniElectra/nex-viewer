import type SerializedRMCMessage from '@/types/nex/serialized-rmc-message';

export type SerializedPRUDPPacket = {
	time?: number;
	version: number;
	source_address: string;
	source_port: number;
	destination_address: string;
	destination_port: number;
	source_stream_id: number;
	source_stream_type: string;
	destination_stream_id: number;
	destination_stream_type: string;
	type: string
	flags: string[]
	session_id: number;
	signature: Buffer;
	sequence_id: number;
	connection_signature?: Buffer;
	fragment_id?: number;
	payload?: Buffer;
	decrypted_payload?: Buffer;
	defragmented_payload?: Buffer;
	message?: SerializedRMCMessage;
};

export type SerializedPRUDPV0Packet = SerializedPRUDPPacket & {
	version: 0;
	checksum: number;
};

export type SerializedPRUDPV1Packet = SerializedPRUDPPacket & {
	version: 1;
	substream_id: number;
	supported_functions?: Buffer;
	initial_unreliable_sequence_id?: number;
	maximum_substream_id?: number;
};

type SerializedPacket = SerializedPRUDPPacket | SerializedPRUDPV0Packet | SerializedPRUDPV1Packet;

export default SerializedPacket;