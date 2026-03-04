import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetNotificationUrlParam';

export default class DataStoreGetNotificationUrlParam extends Structure {
	public get typeName(): string {
		return className;
	}

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
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.previousURL = this.previousURL;

		return json;
	}
}
