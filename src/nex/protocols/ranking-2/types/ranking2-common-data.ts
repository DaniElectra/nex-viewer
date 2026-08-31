import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2CommonData';

export default class Ranking2CommonData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userName = new RVString();
	private mii = new QBuffer();
	private binaryData = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userName.extractFrom(stream);
		this.mii.extractFrom(stream);
		this.binaryData.extractFrom(stream);
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

		json.__fields.userName = this.userName;
		json.__fields.mii = this.mii;
		json.__fields.binaryData = this.binaryData;

		return json;
	}
}
