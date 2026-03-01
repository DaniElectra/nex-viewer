import * as semver from 'compare-versions';
import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class AuthenticationInfo extends Data {
	public get typeName(): string {
		return 'AuthenticationInfo';
	}

	private m_authToken = new RVString();
	private m_ngsVersion = new UInt32();
	private m_authTokenType?: UInt8; // * NEX 3.0
	private m_serverVersion?: UInt32; // * NEX 3.0

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_authToken.extractFrom(stream);
		this.m_ngsVersion.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.main, '>=3.0.0')) {
			this.m_authTokenType = new UInt8();
			this.m_authTokenType.extractFrom(stream);

			this.m_serverVersion = new UInt32();
			this.m_serverVersion.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_authToken: this.m_authToken,
				m_ngsVersion: this.m_ngsVersion
			}
		};

		if (this.m_authTokenType !== undefined) {
			json.__fields.m_authTokenType = this.m_authTokenType;
		}

		if (this.m_serverVersion !== undefined) {
			json.__fields.m_serverVersion = this.m_serverVersion;
		}

		return json;
	}
}
