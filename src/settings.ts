import path from 'node:path';
import { app } from 'electron';
import fs from 'fs-extra';

const appUserDataPath = app.getPath('userData');
const settingsRootPath = path.join(appUserDataPath, 'settings.json');

let settings = {
	recent_files: [],
	accounts: []
};

if (fs.existsSync(settingsRootPath)) {
	settings = fs.readJSONSync(settingsRootPath);
} else {
	saveSettings();
}

if (!settings.recent_files) {
	settings.recent_files = [];
}

if (!settings.accounts) {
	settings.accounts = [];
}

export function saveSettings(): void {
	fs.writeJSONSync(settingsRootPath, settings, {
		spaces: '\t'
	});
}

export default settings;