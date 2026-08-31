import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePostFightingPowerScoreParam';

export default class DataStorePostFightingPowerScoreParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private mode = new UInt8();
	private score = new UInt32();
	private isWorldHighScore = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.mode.extractFrom(stream);
		this.score.extractFrom(stream);
		this.isWorldHighScore.extractFrom(stream);
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

		json.__fields.mode = this.mode;
		json.__fields.score = this.score;
		json.__fields.isWorldHighScore = this.isWorldHighScore;

		return json;
	}
}
