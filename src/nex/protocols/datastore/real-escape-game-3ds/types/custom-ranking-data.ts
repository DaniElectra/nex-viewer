import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CustomRankingData';

export default class CustomRankingData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private score = new UInt32();
	private buffer = new QBuffer();
	private hintCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.score.extractFrom(stream);
		this.buffer.extractFrom(stream);
		this.hintCount.extractFrom(stream);
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

		json.__fields.score = this.score;
		json.__fields.buffer = this.buffer;
		json.__fields.hintCount = this.hintCount;

		return json;
	}
}
