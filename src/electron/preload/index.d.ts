import type { ElectronAPI } from '@electron-toolkit/preload';
import type { SerializedMessage } from '@/types/serialized-message';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onSerializedMessage: (callback: (serializedMessage: SerializedMessage) => void) => void;
		};
	}
}
