import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ValidateAndRequestTicketParam';

export default class ValidateAndRequestTicketParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private platformType = new UInt32();
	private userName = new RVString();
	private extraData = new AnyDataHolder();
	private ignoreApiVersionCheck = new Bool();
	private apiVersionGeneral = new UInt32();
	private apiVersionCustom = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.platformType.extractFrom(stream);
		this.userName.extractFrom(stream);
		this.extraData.extractFrom(stream);
		this.ignoreApiVersionCheck.extractFrom(stream);
		this.apiVersionGeneral.extractFrom(stream);
		this.apiVersionCustom.extractFrom(stream);
	}

	public new(): ValidateAndRequestTicketParam {
		return new ValidateAndRequestTicketParam();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				platformType: this.platformType,
				userName: this.userName,
				extraData: this.extraData,
				ignoreApiVersionCheck: this.ignoreApiVersionCheck,
				apiVersionGeneral: this.apiVersionGeneral,
				apiVersionCustom: this.apiVersionCustom
			}
		};

		return json;
	}
}
