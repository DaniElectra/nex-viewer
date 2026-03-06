import path from 'node:path';
import sourceMapSupport from 'source-map-support';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import createMenu from '@/electron/main/menu';
import settings from '@/settings';
import type State from '@/types/state';

function quitApp(): void {
	app.quit();
}

process.on('SIGINT', quitApp);
process.on('SIGTERM', quitApp);
process.on('SIGHUP', quitApp);

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
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	});

	window.webContents.openDevTools();

	ipcMain.on('saveSettings', (_, newSettings: string) => {
		state.settings.update(JSON.parse(newSettings));
	});

	ipcMain.on('renderer-ready', () => {
		if (process.platform === 'darwin') {
			Menu.setApplicationMenu(createMenu(state, window));
		} else {
			window.setMenu(createMenu(state, window));
		}

		window.webContents.send('settings', JSON.stringify(state.settings));
	});

	window.on('ready-to-show', () => {
		window.show();
	});

	window.maximize();

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		window.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		window.loadFile(path.join(__dirname, '../renderer/index.html'));
	}
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron');

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		quitApp();
	}
});
