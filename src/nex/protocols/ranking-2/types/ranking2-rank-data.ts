import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import Ranking2CommonData from '@/nex/protocols/ranking-2/types/ranking2-common-data';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2RankData';

export default class Ranking2RankData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private misc = new UInt64();
	private nexUniqueId = new UInt64();
	private principalId = new PID();
	private rank = new UInt32();
	private score = new UInt32();
	private commonData = new Ranking2CommonData();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.misc.extractFrom(stream);
		this.nexUniqueId.extractFrom(stream);
		this.principalId.extractFrom(stream);
		this.rank.extractFrom(stream);
		this.score.extractFrom(stream);
		this.commonData.extractFrom(stream);
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

		json.__fields.misc = this.misc;
		json.__fields.nexUniqueId = this.nexUniqueId;
		json.__fields.principalId = this.principalId;
		json.__fields.rank = this.rank;
		json.__fields.score = this.score;
		json.__fields.commonData = this.commonData;

		return json;
	}
}
