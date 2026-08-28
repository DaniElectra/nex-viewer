import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/pokemon-bank/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolPokemonBank {
	static ID = 0x73;
	static Name = 'DataStore (Pokémon Bank)';

	static Methods = {
		PrepareUploadPokemon: 0x28,
		UploadPokemon: 0x29,
		SearchPokemon: 0x2A,
		PrepareTradePokemon: 0x2B,
		TradePokemon: 0x2C,
		DownloadOtherPokemon: 0x2D,
		DownloadMyPokemon: 0x2E,
		DeletePokemon: 0x2F,
		GetTransactionParam: 0x30,
		PreparePostBankObject: 0x31,
		CompletePostBankObject: 0x32,
		PrepareGetBankObject: 0x33,
		PrepareUpdateBankObject: 0x34,
		CompleteUpdateBankObject: 0x35,
		RollbackBankObject: 0x36,
		GetUnlockKey: 0x37,
		RequestMigration: 0x38,
		GetMigrationStatus: 0x39
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x28: DataStoreProtocolPokemonBank.PrepareUploadPokemon,
		0x29: DataStoreProtocolPokemonBank.UploadPokemon,
		0x2A: DataStoreProtocolPokemonBank.SearchPokemon,
		0x2B: DataStoreProtocolPokemonBank.PrepareTradePokemon,
		0x2C: DataStoreProtocolPokemonBank.TradePokemon,
		0x2D: DataStoreProtocolPokemonBank.DownloadOtherPokemon,
		0x2E: DataStoreProtocolPokemonBank.DownloadMyPokemon,
		0x2F: DataStoreProtocolPokemonBank.DeletePokemon,
		0x30: DataStoreProtocolPokemonBank.GetTransactionParam,
		0x31: DataStoreProtocolPokemonBank.PreparePostBankObject,
		0x32: DataStoreProtocolPokemonBank.CompletePostBankObject,
		0x33: DataStoreProtocolPokemonBank.PrepareGetBankObject,
		0x34: DataStoreProtocolPokemonBank.PrepareUpdateBankObject,
		0x35: DataStoreProtocolPokemonBank.CompleteUpdateBankObject,
		0x36: DataStoreProtocolPokemonBank.RollbackBankObject,
		0x37: DataStoreProtocolPokemonBank.GetUnlockKey,
		0x38: DataStoreProtocolPokemonBank.RequestMigration,
		0x39: DataStoreProtocolPokemonBank.GetMigrationStatus
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolPokemonBank.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static PrepareUploadPokemon(message: RMCMessage): typeof Methods.PrepareUploadPokemon.Request | typeof Methods.PrepareUploadPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareUploadPokemon.Request;
		} else {
			return Methods.PrepareUploadPokemon.Response;
		}
	}

	private static UploadPokemon(message: RMCMessage): typeof Methods.UploadPokemon.Request | typeof Methods.UploadPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadPokemon.Request;
		} else {
			return Methods.UploadPokemon.Response;
		}
	}

	private static SearchPokemon(message: RMCMessage): typeof Methods.SearchPokemon.Request | typeof Methods.SearchPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchPokemon.Request;
		} else {
			return Methods.SearchPokemon.Response;
		}
	}

	private static PrepareTradePokemon(message: RMCMessage): typeof Methods.PrepareTradePokemon.Request | typeof Methods.PrepareTradePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareTradePokemon.Request;
		} else {
			return Methods.PrepareTradePokemon.Response;
		}
	}

	private static TradePokemon(message: RMCMessage): typeof Methods.TradePokemon.Request | typeof Methods.TradePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.TradePokemon.Request;
		} else {
			return Methods.TradePokemon.Response;
		}
	}

	private static DownloadOtherPokemon(message: RMCMessage): typeof Methods.DownloadOtherPokemon.Request | typeof Methods.DownloadOtherPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DownloadOtherPokemon.Request;
		} else {
			return Methods.DownloadOtherPokemon.Response;
		}
	}

	private static DownloadMyPokemon(message: RMCMessage): typeof Methods.DownloadMyPokemon.Request | typeof Methods.DownloadMyPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DownloadMyPokemon.Request;
		} else {
			return Methods.DownloadMyPokemon.Response;
		}
	}

	private static DeletePokemon(message: RMCMessage): typeof Methods.DeletePokemon.Request | typeof Methods.DeletePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeletePokemon.Request;
		} else {
			return Methods.DeletePokemon.Response;
		}
	}

	private static GetTransactionParam(message: RMCMessage): typeof Methods.GetTransactionParam.Request | typeof Methods.GetTransactionParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTransactionParam.Request;
		} else {
			return Methods.GetTransactionParam.Response;
		}
	}

	private static PreparePostBankObject(message: RMCMessage): typeof Methods.PreparePostBankObject.Request | typeof Methods.PreparePostBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostBankObject.Request;
		} else {
			return Methods.PreparePostBankObject.Response;
		}
	}

	private static CompletePostBankObject(message: RMCMessage): typeof Methods.CompletePostBankObject.Request | typeof Methods.CompletePostBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostBankObject.Request;
		} else {
			return Methods.CompletePostBankObject.Response;
		}
	}

	private static PrepareGetBankObject(message: RMCMessage): typeof Methods.PrepareGetBankObject.Request | typeof Methods.PrepareGetBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetBankObject.Request;
		} else {
			return Methods.PrepareGetBankObject.Response;
		}
	}

	private static PrepareUpdateBankObject(message: RMCMessage): typeof Methods.PrepareUpdateBankObject.Request | typeof Methods.PrepareUpdateBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareUpdateBankObject.Request;
		} else {
			return Methods.PrepareUpdateBankObject.Response;
		}
	}

	private static CompleteUpdateBankObject(message: RMCMessage): typeof Methods.CompleteUpdateBankObject.Request | typeof Methods.CompleteUpdateBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompleteUpdateBankObject.Request;
		} else {
			return Methods.CompleteUpdateBankObject.Response;
		}
	}

	private static RollbackBankObject(message: RMCMessage): typeof Methods.RollbackBankObject.Request | typeof Methods.RollbackBankObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RollbackBankObject.Request;
		} else {
			return Methods.RollbackBankObject.Response;
		}
	}

	private static GetUnlockKey(message: RMCMessage): typeof Methods.GetUnlockKey.Request | typeof Methods.GetUnlockKey.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUnlockKey.Request;
		} else {
			return Methods.GetUnlockKey.Response;
		}
	}

	private static RequestMigration(message: RMCMessage): typeof Methods.RequestMigration.Request | typeof Methods.RequestMigration.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestMigration.Request;
		} else {
			return Methods.RequestMigration.Response;
		}
	}

	private static GetMigrationStatus(message: RMCMessage): typeof Methods.GetMigrationStatus.Request | typeof Methods.GetMigrationStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMigrationStatus.Request;
		} else {
			return Methods.GetMigrationStatus.Response;
		}
	}
}
