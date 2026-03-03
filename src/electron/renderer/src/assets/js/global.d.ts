import type { SerializedMessage } from '@/types/serialized-message';

declare global {
	interface Window {
		api: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onSerializedMessage: (callback: (serializedMessage: SerializedMessage) => void) => void;
		};
	}
}
