import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import DataStoreFetchMyInfosBalloonResult from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-fetch-my-infos-balloon-result';
import DataStoreFetchMyInfosAchievementResult from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-fetch-my-infos-achievement-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFetchMyInfosResult';

export default class DataStoreFetchMyInfosResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private balloons = new List(new DataStoreFetchMyInfosBalloonResult());
	private achievement = new DataStoreFetchMyInfosAchievementResult();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.balloons.extractFrom(stream);
		this.achievement.extractFrom(stream);
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

		json.__fields.balloons = this.balloons;
		json.__fields.achievement = this.achievement;

		return json;
	}
}
