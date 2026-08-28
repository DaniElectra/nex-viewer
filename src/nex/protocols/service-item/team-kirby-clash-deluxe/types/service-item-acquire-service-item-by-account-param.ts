import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAcquireServiceItemByAccountParam';

export default class ServiceItemAcquireServiceItemByAccountParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceIdForAcquisition = new RVString();
	private referenceIdForRightBinary = new RVString();
	private useType = new UInt8();
	private limitationType = new UInt32();
	private limitationValue = new UInt32();
	private rightBinary = new QBuffer();
	private logMessage = new RVString();
	private uniqueId = new UInt32();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceIdForAcquisition.extractFrom(stream);
		this.referenceIdForRightBinary.extractFrom(stream);
		this.useType.extractFrom(stream);
		this.limitationType.extractFrom(stream);
		this.limitationValue.extractFrom(stream);
		this.rightBinary.extractFrom(stream);
		this.logMessage.extractFrom(stream);
		this.uniqueId.extractFrom(stream);

		if (this.revision >= 1) {
			this.platform = new UInt8();
			this.platform.extractFrom(stream);
		}
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

		json.__fields.referenceIdForAcquisition = this.referenceIdForAcquisition;
		json.__fields.referenceIdForRightBinary = this.referenceIdForRightBinary;
		json.__fields.useType = this.useType;
		json.__fields.limitationType = this.limitationType;
		json.__fields.limitationValue = this.limitationValue;
		json.__fields.rightBinary = this.rightBinary;
		json.__fields.logMessage = this.logMessage;
		json.__fields.uniqueId = this.uniqueId;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
