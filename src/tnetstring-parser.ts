import ByteStream from '@/byte-stream';

export type TNetStringPrimitive = Buffer | number | boolean | string | null;
export type TNetStringDictionaryNode = { [key: string]: TNetStringNode };
export type TNetStringListNode = TNetStringNode[];
export type TNetStringNode = TNetStringPrimitive | TNetStringDictionaryNode | TNetStringListNode;

export default class TNetStringParser {
	private buffer: Buffer;
	private stream: ByteStream;
	private TYPES = {
		STRING: ',',
		INTEGER: '#',
		FLOAT: '^',
		BOOLEAN: '!',
		NULL: '~',
		DICTIONARY: '}',
		LIST: ']',
		MITMPROXY_UNICODE: ';' // * Custom data type defined by mitmproxy https://github.com/mitmproxy/mitmproxy/blob/a4d794c59a27472d193a592d8037505a1cf6ae93/mitmproxy/io/tnetstring.py
	} as const;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.stream = new ByteStream(this.buffer);
	}

	public hasDataLeft(): boolean {
		return this.stream.hasDataLeft();
	}

	public parseNode(): TNetStringNode {
		let sizeString = '';

		while (true) {
			const char = this.stream.readString(1);
			if (char !== ':') {
				sizeString += char;
			} else {
				break;
			}
		}

		const size = parseInt(sizeString);
		const data = this.stream.read(size);
		const type = this.stream.readString(1);
		const dataString = data.toString();
		let value: any;

		switch (type) {
			case this.TYPES.STRING:
				value = data; // * tnetstring does not have separate "binary data" and "real string" types, so leave strings as bytes
				break;
			case this.TYPES.INTEGER:
				value = parseInt(dataString);
				break;
			case this.TYPES.FLOAT:
				value = parseFloat(dataString);
				break;
			case this.TYPES.BOOLEAN:
				value = dataString === 'true';
				break;
			case this.TYPES.NULL:
				// TODO - This should check of the size is 0
				value = null;
				break;
			case this.TYPES.DICTIONARY:
				value = this.parseDictionary(data);
				break;
			case this.TYPES.LIST:
				value = this.parseList(data);
				break;
			case this.TYPES.MITMPROXY_UNICODE:
				value = data.toString();
				break;
		}

		return value;
	}

	private parseDictionary(data: Buffer): TNetStringDictionaryNode {
		const dictionary = {} as Record<string, any>;
		if (data.length === 0) {
			return dictionary;
		}

		const tnetstring = new TNetStringParser(data);

		while (tnetstring.hasDataLeft()) {
			const key = tnetstring.parseNode();
			const value = tnetstring.parseNode();

			if (typeof key === 'string') {
				dictionary[key] = value;
			}
		}

		return dictionary;
	}

	private parseList(data: Buffer): TNetStringListNode {
		const list = [] as any[];
		if (data.length === 0) {
			return list;
		}

		const tnetstring = new TNetStringParser(data);

		while (tnetstring.hasDataLeft()) {
			list.push(tnetstring.parseNode());
		}

		return list;
	}
}
