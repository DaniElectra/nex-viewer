import type { ElectronAPI } from '@electron-toolkit/preload';
import type SerializedPacket from '@/types/nex/serialized-packet';
import type { NPLNTransaction } from '@/npln/npln-transaction';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onPacket: (callback: (packet: SerializedPacket) => void) => void;
			onNPLNTransaction: (callback: (nplnTransaction: NPLNTransaction) => void) => void;
		};
	}
}
