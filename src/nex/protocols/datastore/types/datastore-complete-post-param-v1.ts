import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreCompletePostParamV1';

export default class DataStoreCompletePostParamV1 extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt32();
	private isSuccess = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.isSuccess.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.isSuccess = this.isSuccess;

		return json;
	}
}
