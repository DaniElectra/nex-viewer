import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FestivalUploadVoteParam';

export default class FestivalUploadVoteParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private festivalId = new UInt32();
	private themeId = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.festivalId.extractFrom(stream);
		this.themeId.extractFrom(stream);
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

		json.__fields.festivalId = this.festivalId;
		json.__fields.themeId = this.themeId;

		return json;
	}
}
