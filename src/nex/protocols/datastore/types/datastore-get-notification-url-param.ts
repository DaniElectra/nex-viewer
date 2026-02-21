import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreGetNotificationUrlParam extends Structure {
	public readonly typeName = 'DataStoreGetNotificationUrlParam';

	private previousURL = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.previousURL.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.previousURL = this.previousURL;

		return json;
	}
}
