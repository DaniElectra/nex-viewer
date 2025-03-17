import Data from '@/nex/types/data';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class NNAInfo extends Data {
	public get typeName(): string {
		return 'NNAInfo';
	}

	private principalBasicInfo = new PrincipalBasicInfo();
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalBasicInfo.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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
				principalBasicInfo: this.principalBasicInfo,
				unknown1: this.unknown1,
				unknown2: this.unknown2
			}
		};
	}
}