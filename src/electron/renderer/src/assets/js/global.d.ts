import type SerializedPacket from '@/types/nex/serialized-packet';
import type PRUDPConnection from '@/nex/prudp-connection';
import type { NPLNTransaction } from '@/npln/npln-transaction';

declare global {
	interface Window {
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onPacket: (callback: (packet: SerializedPacket) => void) => void;
			onConnections: (callback: (connections: PRUDPConnection[]) => void) => void;
			onNPLNTransaction: (callback: (nplnTransaction: NPLNTransaction) => void) => void;
		};
	}
}
