import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'TournamentProfileInfo';

export default class TournamentProfileInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private unknown2 = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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

		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;

		return json;
	}
}
