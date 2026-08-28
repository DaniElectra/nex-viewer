import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import DataStoreSearchBalloonResult from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-search-balloon-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchBalloonResultSet';

export default class DataStoreSearchBalloonResultSet extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private balloons = new List(new DataStoreSearchBalloonResult());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.balloons.extractFrom(stream);
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

		return json;
	}
}
