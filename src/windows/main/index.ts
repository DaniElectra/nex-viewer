// TODO - Should we just merge the "renderers" and "windows" folders?

import path from 'node:path';
import sourceMapSupport from 'source-map-support';
import { app, BrowserWindow, ipcMain } from 'electron';
import createMenu from '@/windows/main/menu';
import settings from '@/settings';
import type State from '@/types/state';

// * Required for getting source maps to work in Electron apps
// * See https://github.com/electron/electron/issues/38875
sourceMapSupport.install();

global.Object.defineProperty(global.BigInt.prototype, 'toJSON', {
	value: function () {
		return this.toString();
	},
	configurable: true,
	enumerable: false,
	writable: true
});

app.setName('NEX Viewer');

// TODO - Should all of this just be combined into the Settings class and remove State?
const state: State = {
	raw_rmc: false,
	settings: settings
};

function createWindow(): void {
	const window = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.js') // * Target the transpiled JS
		}
	});

	window.webContents.openDevTools();

	ipcMain.on('renderer-ready', () => {
		window.setMenu(createMenu(state));
	});

	window.maximize();
	window.loadFile(path.join(__dirname, '../../renderers/main/index.html'));
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
