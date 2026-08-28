import DDLClass from '@/nex/types/ddl-class';
import OLSCompetitionResult from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-competition-result';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSCompetition';

export default class OLSCompetition extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private result = new OLSCompetitionResult();
	private message = new RVString();
	private seed = new UInt32();
	private objective = new Float();
	private score_validation = new Float();
	private id_bricks = new UInt32();
	private score = new Float();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.result.extractFrom(stream);
		this.message.extractFrom(stream);
		this.seed.extractFrom(stream);
		this.objective.extractFrom(stream);
		this.score_validation.extractFrom(stream);
		this.id_bricks.extractFrom(stream);
		this.score.extractFrom(stream);
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

		json.__fields.result = this.result;
		json.__fields.message = this.message;
		json.__fields.seed = this.seed;
		json.__fields.objective = this.objective;
		json.__fields.score_validation = this.score_validation;
		json.__fields.id_bricks = this.id_bricks;
		json.__fields.score = this.score;

		return json;
	}
}
