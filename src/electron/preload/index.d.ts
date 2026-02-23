import type { ElectronAPI } from '@electron-toolkit/preload';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onPacket: (callback: (packet: SerializedPacket) => void) => void;
		};
	}
}
