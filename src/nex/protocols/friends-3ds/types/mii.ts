import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt8 from '@/nex/types/uint8';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class Mii extends Data {
	public get typeName(): string {
		return 'Mii';
	}

	private name = new RVString();
	private profanityFlag = new Bool();
	private characterSet = new UInt8();
	private data = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.name.extractFrom(stream);
		this.profanityFlag.extractFrom(stream);
		this.characterSet.extractFrom(stream);
		this.data.extractFrom(stream);
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
				name: this.name,
				profanityFlag: this.profanityFlag,
				characterSet: this.characterSet,
				data: this.data
			}
		};
	}
}