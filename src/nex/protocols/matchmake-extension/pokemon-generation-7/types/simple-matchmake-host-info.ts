import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SimpleMatchmakeHostInfo';

export default class SimpleMatchmakeHostInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private sessionKey = new RVBuffer();
	private stationUrls = new List(new StationURL());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.sessionKey.extractFrom(stream);
		this.stationUrls.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.sessionKey = this.sessionKey;
		json.__fields.stationUrls = this.stationUrls;

		return json;
	}
}
