import ByteStream from '@/byte-stream';
import type NEXByteStreamSettings from '@/types/nex/byte-stream-settings';

export default class NEXByteStream extends ByteStream {
	public settings: NEXByteStreamSettings;

	constructor(buffer: Buffer, settings: NEXByteStreamSettings) {
		super(buffer);

		this.settings = settings;
	}
}