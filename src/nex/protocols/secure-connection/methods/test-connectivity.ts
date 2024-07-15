
// * No request data
export class Request {
	public static Name = 'TestConnectivity';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}

// * No response data
export class Response {
	public static Name = 'TestConnectivity';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}