import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type { IpcRenderer } from 'electron';

// * Custom APIs for renderer
const api = {
	ready: (): void => ipcRenderer.send('renderer-ready'),
	onClearSections: (callback: () => void): IpcRenderer => ipcRenderer.on('clear-sections', _event => callback()),
	onPacket: (callback: (packet: any) => void): IpcRenderer => ipcRenderer.on('packet', (_event, packet) => callback(JSON.parse(packet)))
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
