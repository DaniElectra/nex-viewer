import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type { IpcRenderer } from 'electron';
import type { SerializedMessage } from '@/types/serialized-message';

// * Custom APIs for renderer
const api = {
	ready: (): void => ipcRenderer.send('renderer-ready'),
	onClearSections: (callback: () => void): IpcRenderer => ipcRenderer.on('clear-sections', _event => callback()),
	onPacket: (callback: (packet: any) => void): IpcRenderer => ipcRenderer.on('packet', (_event, packet) => callback(JSON.parse(packet))),
	onNPLNTransaction: (callback: (transaction: any) => void): IpcRenderer => ipcRenderer.on('nplnTransaction', (_event, transaction) => callback(JSON.parse(transaction))),
	onSerializedMessage: (callback: (message: SerializedMessage) => void): IpcRenderer => ipcRenderer.on('serializedMessage', (_event, transaction) => callback(JSON.parse(transaction))),
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-expect-error - Defined in dts
	window.electron = electronAPI;
	// @ts-expect-error - Defined in dts
	window.api = api;
}
