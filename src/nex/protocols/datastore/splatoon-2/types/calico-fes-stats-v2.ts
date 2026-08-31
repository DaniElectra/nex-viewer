import CalicoFesStats from '@/nex/protocols/datastore/splatoon-2/types/calico-fes-stats';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoFesStatsV2';

export default class CalicoFesStatsV2 extends CalicoFesStats {
	public get typeName(): string {
		return className;
	}

	private otherThemeId = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.otherThemeId.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.otherThemeId = this.otherThemeId;

		return json;
	}
}
