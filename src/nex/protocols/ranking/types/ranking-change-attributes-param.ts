import Structure from '@/nex/types/structure';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingChangeAttributesParam';

export default class RankingChangeAttributesParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private modificationFlag = new UInt8();
	private groups = new List(new UInt8());
	private param = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.modificationFlag.extractFrom(stream);
		this.groups.extractFrom(stream);
		this.param.extractFrom(stream);
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
				modificationFlag: this.modificationFlag,
				groups: this.groups,
				param: this.param
			}
		};
	}
}
