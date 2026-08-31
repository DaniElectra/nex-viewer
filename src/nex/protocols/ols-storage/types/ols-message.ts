import DDLClass from '@/nex/types/ddl-class';
import Int8 from '@/nex/types/int8';
import Bool from '@/nex/types/bool';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import OLSAttribute from '@/nex/protocols/ols-storage/types/ols-attribute';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSMessage';

export default class OLSMessage extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private message_type = new Int8();
	private message_prompt = new Bool();
	private message_drc = new Bool();
	private message_bloomberg = new Bool();
	private message_date = new DateTime();
	private message_duration = new UInt32();
	private message_title = new RVString();
	private message_body = new RVString();
	private message_buttons = new List(new RVString());
	private message_attributes = new List(new OLSAttribute());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.message_type.extractFrom(stream);
		this.message_prompt.extractFrom(stream);
		this.message_drc.extractFrom(stream);
		this.message_bloomberg.extractFrom(stream);
		this.message_date.extractFrom(stream);
		this.message_duration.extractFrom(stream);
		this.message_title.extractFrom(stream);
		this.message_body.extractFrom(stream);
		this.message_buttons.extractFrom(stream);
		this.message_attributes.extractFrom(stream);
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

		json.__fields.message_type = this.message_type;
		json.__fields.message_prompt = this.message_prompt;
		json.__fields.message_drc = this.message_drc;
		json.__fields.message_bloomberg = this.message_bloomberg;
		json.__fields.message_date = this.message_date;
		json.__fields.message_duration = this.message_duration;
		json.__fields.message_title = this.message_title;
		json.__fields.message_body = this.message_body;
		json.__fields.message_buttons = this.message_buttons;
		json.__fields.message_attributes = this.message_attributes;

		return json;
	}
}
