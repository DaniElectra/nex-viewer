import type { ElectronAPI } from '@electron-toolkit/preload';
import type { SerializedMessage } from '@/types/serialized-message';
import type { SettingsJSON } from '@/types/settings';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onSerializedMessage: (callback: (serializedMessage: SerializedMessage) => void) => void;
			onSettings: (callback: (newSettings: SettingsJSON) => void) => void;
			copyToClipboard: (text: string) => void; // TODO - Should this go on the electron global instead?
		};
	}
}
