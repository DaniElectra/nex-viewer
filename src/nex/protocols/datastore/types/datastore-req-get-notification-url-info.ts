import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreReqGetNotificationUrlInfo extends Structure {
	public readonly typeName = 'DataStoreReqGetNotificationUrlInfo';

	private uRL = new RVString();
	private key = new RVString();
	private query = new RVString();
	private rootCACert = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uRL.extractFrom(stream);
		this.key.extractFrom(stream);
		this.query.extractFrom(stream);
		this.rootCACert.extractFrom(stream);
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

		json.__fields.uRL = this.uRL;
		json.__fields.key = this.key;
		json.__fields.query = this.query;
		json.__fields.rootCACert = this.rootCACert;

		return json;
	}
}
