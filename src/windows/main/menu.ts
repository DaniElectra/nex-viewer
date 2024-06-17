import { Menu, dialog, BrowserWindow } from 'electron';
import Session from '@/nex/session';
import type { MenuItemConstructorOptions } from 'electron';
import type State from '@/types/state';

function openSession(path: string, state: State): void {
	const browserWindow = BrowserWindow.getFocusedWindow()!;

	browserWindow.webContents.send('clear-sections');
	browserWindow.setTitle(`NEX Viewer - ${path}`);

	const session = new Session();

	session.on('packet', packet => {
		browserWindow.webContents.send('packet', JSON.stringify(packet));
	});

	session.on('finished', connections => {
		browserWindow.webContents.send('connections', JSON.stringify(connections));
	});

	session.parse(path);

	state.settings.addRecentFile(path);

	browserWindow.setMenu(createMenu(state));
}

export default function createMenu(state: State): Menu {
	let recentFiles: MenuItemConstructorOptions[] = state.settings.recentFiles().map(path => ({
		label: path,
		click: (): void => openSession(path, state)
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
			label: 'File',
			id: 'file',
			submenu: [
				{
					label: 'Open...',
					async click(menuItem, browserWindow): Promise<void> {
						const result = await dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{ name: 'Packet Capture', extensions: ['pcapng', 'pcap'] }
							]
						});

						if (result.canceled || !browserWindow) {
							return;
						}

						openSession(result.filePaths[0], state);
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