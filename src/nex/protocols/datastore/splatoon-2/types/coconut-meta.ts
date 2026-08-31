import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CoconutMeta';

export default class CoconutMeta extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private tweetId = new UInt64();
	private region = new UInt8();
	private postType = new UInt8();
	private themeId = new UInt8();
	private festivalId = new UInt32();
	private language = new RVString();
	private binaryData = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.tweetId.extractFrom(stream);
		this.region.extractFrom(stream);
		this.postType.extractFrom(stream);
		this.themeId.extractFrom(stream);
		this.festivalId.extractFrom(stream);
		this.language.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.tweetId = this.tweetId;
		json.__fields.region = this.region;
		json.__fields.postType = this.postType;
		json.__fields.themeId = this.themeId;
		json.__fields.festivalId = this.festivalId;
		json.__fields.language = this.language;
		json.__fields.binaryData = this.binaryData;

		return json;
	}
}
