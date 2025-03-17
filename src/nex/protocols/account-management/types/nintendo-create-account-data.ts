import Structure from '@/nex/types/structure';
import NNAInfo from '@/nex/protocols/friends-wiiu/types/nna-info';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

export default class NintendoCreateAccountData extends Structure {
	public readonly typeName = 'NintendoCreateAccountData';

	private NNAInfo = new NNAInfo();
	private token = new RVString();
	private birthday = new DateTime();
	private unknown = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.NNAInfo.extractFrom(stream);
		this.token.extractFrom(stream);
		this.birthday.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				NNAInfo: this.NNAInfo,
				token: this.token,
				birthday: this.birthday,
				unknown: this.unknown
			}
		};
	}
}