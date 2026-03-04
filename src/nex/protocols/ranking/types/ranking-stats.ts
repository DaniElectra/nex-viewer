import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingStats';

export default class RankingStats extends Structure {
	public get typeName(): string {
		return className;
	}

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
			}
		};
	}
}
