import path from 'node:path';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import fs from 'fs-extra';
import createMenu from '@/windows/main/menu';
import type State from '@/types/state';

global.Object.defineProperty(global.BigInt.prototype, 'toJSON', {
	value: function() { return this.toString(); },
	configurable: true,
	enumerable: false,
	writable: true
});

app.setName('NEX Viewer');

const appUserDataPath = app.getPath('userData');
const settingsRootPath = path.join(appUserDataPath, 'settings.json');

if (!fs.existsSync(settingsRootPath)) {
	fs.writeFileSync(settingsRootPath, JSON.stringify({
		recent_files: []
	}));
}

const state: State = {
	raw_rmc: false,
	settings: fs.readJSONSync(settingsRootPath)
};

for (const recentFile of state.settings.recent_files) {
	// TODO - Actually store these
	app.addRecentDocument(recentFile);
}

function createWindow(): void {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { // TODO - Use Electron's contextBridge instead
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	window.webContents.openDevTools();

	ipcMain.on('renderer-ready', () => {
		Menu.setApplicationMenu(createMenu(state));
	});

	window.maximize();
	window.loadFile('../../renderers/main/index.html');
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(Menu.buildFromTemplate([])); // * Clear menu before frontend loads

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