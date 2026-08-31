import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import RVMap from '@/nex/types/map';
import Variant from '@/nex/types/variant';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PlayLogEntry';

export default class PlayLogEntry extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userID = new PID();
	private playerName = new RVString();
	private unknown = new UInt64();
	private properties = new RVMap(new RVString(), new Variant());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userID.extractFrom(stream);
		this.playerName.extractFrom(stream);
		this.unknown.extractFrom(stream);
		this.properties.extractFrom(stream);
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

		json.__fields.userID = this.userID;
		json.__fields.playerName = this.playerName;
		json.__fields.unknown = this.unknown;
		json.__fields.properties = this.properties;

		return json;
	}
}
