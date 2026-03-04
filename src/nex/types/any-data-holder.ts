import NEXByteStream from '@/nex/byte-stream';
import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type RVType from '@/nex/types/rv-type';

const className = 'AnyDataHolder';

// TODO - This class is very wrong, see https://github.com/PretendoNetwork/nex-go/issues/74
export default class AnyDataHolder extends Structure {
	public static Classes: Record<string, new () => RVType> = {};

	public get typeName(): string {
		return className;
	}

	private name = new RVString();
	private length1 = new UInt32();
	private length2 = new UInt32();
	private objectData?: RVType;

	public extractFrom(stream: NEXByteStream): void {
		this.name.extractFrom(stream);
		this.length1.extractFrom(stream);
		this.length2.extractFrom(stream);

		const objectStream = new NEXByteStream(stream.read(this.length2.value!), stream.title);

		if (AnyDataHolder.Classes[this.name.value!]) {
			this.objectData = new AnyDataHolder.Classes[this.name.value!]();

			this.objectData.extractFrom(objectStream);
		}

		// TODO - Error if not found
	}

	public new(): AnyDataHolder {
		return new AnyDataHolder();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: `${className}<${this.name.value}>`,
			__typeName: className,
			__fields: {
				name: this.name,
				length1: this.length1,
				length2: this.length2,
				objectData: this.objectData
			}
		};
	}
}
