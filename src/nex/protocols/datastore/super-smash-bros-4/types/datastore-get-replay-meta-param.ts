import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetReplayMetaParam';

export default class DataStoreGetReplayMetaParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private replayId = new UInt64();
	private metaType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.replayId.extractFrom(stream);
		this.metaType.extractFrom(stream);
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

		json.__fields.replayId = this.replayId;
		json.__fields.metaType = this.metaType;

		return json;
	}
}
