import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import MiiV2 from '@/nex/protocols/friends-wiiu/types/mii-v2';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class PrincipalBasicInfo extends Data {
	public get typeName(): string {
		return 'PrincipalBasicInfo';
	}

	private pid = new PID();
	private nnid = new RVString();
	private mii = new MiiV2();
	private unknown = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.nnid.extractFrom(stream);
		this.mii.extractFrom(stream);
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
				pid: this.pid,
				nnid: this.nnid,
				mii: this.mii,
				unknown: this.unknown
			}
		};
	}
}
