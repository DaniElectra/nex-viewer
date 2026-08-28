import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ScorePack';

export default class ScorePack extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private data = new List(new QBuffer());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.data.extractFrom(stream);
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

		json.__fields.data = this.data;

		return json;
	}
}
