import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PersistentGatheringSearchCriteria';

export default class PersistentGatheringSearchCriteria extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new List(new RVString());
	private unknown2 = new RVString();

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
