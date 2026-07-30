import type RMCMessage from '@/nex/rmc-message'
import NEXByteStream from '@/nex/byte-stream'
import UInt32 from '@/nex/types/uint32'

export class Request {
    public static Name = 'SetPrivacyLevel';

    private privacyLevel = new UInt32();

    constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

        this.privacyLevel.extractFrom(stream);
    }

    public toJSON(): any{
        return {
            privacyLevel: this.privacyLevel
        };
    }
}

// * No response data
export class Response {
	public static Name = 'SetPrivacyLevel';

	constructor() { }

	public toJSON(): any {
		return {};
	}
}