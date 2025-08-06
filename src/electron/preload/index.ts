import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// * Custom APIs for renderer
const api = {
	ready: () => ipcRenderer.send('renderer-ready'),
	onClearSections: (callback: () => void) => ipcRenderer.on('clear-sections', _event => callback()),
	onPacket: (callback: (packet: any) => void) => ipcRenderer.on('packet', (_event, packet) => callback(JSON.parse(packet))),
	onConnections: (callback: (connections: any) => void) => ipcRenderer.on('connections', (_event, connections) => callback(JSON.parse(connections)))
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
