import path from 'node:path';
import { Menu, dialog, shell } from 'electron';
import Session from '@/nex/session';
import type { MenuItemConstructorOptions, BrowserWindow } from 'electron';
import type State from '@/types/state';

function openSession(path: string, browserWindow: BrowserWindow, state: State): void {
	browserWindow.webContents.send('clear-sections');
	browserWindow.setTitle(`NEX Viewer - ${path}`);

	const session = new Session();
	let packetID = 0;

	session.on('packet', (packet) => {
		packet = JSON.parse(JSON.stringify(packet)); // TODO - This is a dirty nasty hack, including the whole "id" system. Needed for Vue though
		packet.id = packetID++;
		browserWindow.webContents.send('packet', JSON.stringify(packet));
	});

	session.parse(path);

	state.settings.addRecentFile(path);

	refreshMenu(state, browserWindow);
}

function refreshMenu(state: State, browserWindow: BrowserWindow): void {
	if (process.platform === 'darwin') {
		Menu.setApplicationMenu(createMenu(state, browserWindow));
	} else {
		browserWindow.setMenu(createMenu(state, browserWindow));
	}
}

export default function createMenu(state: State, browserWindow: BrowserWindow): Menu {
	let recentFiles: MenuItemConstructorOptions[] = state.settings.recentFiles().map(filePath => ({
		label: filePath,
		click: (): void => {
			openSession(filePath, browserWindow, state);
		}
	}));

	if (recentFiles.length) {
		recentFiles = [
			...recentFiles,
			{
				type: 'separator'
			},
			{
				label: 'Clear Menu',
				click: (): void => {
					state.settings.clearRecentFiles();
					refreshMenu(state, browserWindow);
				}
			}
		];
	} else {
		recentFiles = [
			{
				label: 'No Recent Files',
				enabled: false
			}
		];
	}

	return Menu.buildFromTemplate([
		{
			label: 'NEX Viewer', // TODO - This doesn't seem to work? Always says "Electron". Also swap to getting the name from the app itself (app.name)?
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		},
		{
			label: 'File',
			id: 'file',
			submenu: [
				{
					label: 'Open...',
					async click(): Promise<void> {
						const result = await dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{
									name: 'Packet Capture',
									extensions: [
										'pcapng', 'pcap',
										'chls', 'chlz',
										'flows', 'flow'
									]
								}
							]
						});

						if (result.canceled || !browserWindow) {
							return;
						}

						openSession(result.filePaths[0], browserWindow, state);
					}
				},
				{
					type: 'separator'

				},
				{
					label: 'Open Recent',
					submenu: recentFiles
				},
				{
					role: 'quit'
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'selectAll' }
			]
		},
		{
			label: 'Settings',
			submenu: [ // TODO - Add back in the PING packet and maybe RawRMC settings?
				{
					label: 'Open settings.json',
					click: (): void => {
						shell.openPath(state.settings.path);
					}
				},
				{
					label: 'Open settings.json folder',
					click: (): void => {
						shell.openPath(path.dirname(state.settings.path));
					}
				}
			]
		}
	]);
}
