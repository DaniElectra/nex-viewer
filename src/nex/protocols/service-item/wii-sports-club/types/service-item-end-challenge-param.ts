import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import ServiceItemUserInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-user-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemEndChallengeParam';

export default class ServiceItemEndChallengeParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private challengeScheduleId = new UInt32();
	private userInfo = new ServiceItemUserInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.challengeScheduleId.extractFrom(stream);
		this.userInfo.extractFrom(stream);
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

		json.__fields.challengeScheduleId = this.challengeScheduleId;
		json.__fields.userInfo = this.userInfo;

		return json;
	}
}
