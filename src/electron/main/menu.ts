import { Menu, dialog } from 'electron';
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

	session.on('finished', (connections) => {
		browserWindow.webContents.send('connections', JSON.stringify(connections));
	});

	session.parse(path);

	state.settings.addRecentFile(path);

	browserWindow.setMenu(createMenu(state));
}

export default function createMenu(state: State): Menu {
	let recentFiles: MenuItemConstructorOptions[] = state.settings.recentFiles().map(path => ({
		label: path,
		click: (): void => {
			// TODO - Track the current window and pass it to openSession
			dialog.showMessageBox({
				message: 'Recent files not yet implemented'
			});
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
				click: (): void => state.settings.clearRecentFiles()
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
			label: 'File',
			id: 'file',
			submenu: [
				{
					label: 'Open...',
					async click(menuItem, browserWindow): Promise<void> {
						const result = await dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{
									name: 'Packet Capture',
									extensions: [
										'pcapng', 'pcap',
										'chls',
										'flows', 'flow'
									]
								}
							]
						});

						if (result.canceled || !browserWindow) {
							return;
						}

						openSession(result.filePaths[0], browserWindow as BrowserWindow, state);
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
		}
		// TODO - Add back in the PING packet and maybe RawRMC settings?
	]);
}
