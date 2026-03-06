export type Account = {
	username?: string;
	pid: bigint;
	password?: string;
	password_hash_old?: string;
	password_hash_new?: string;
	platform?: string;
	type?: 'Rendex-Vous' | 'NEX';
};

export type SettingsJSON = {
	recent_files: string[];
	accounts: Account[];
};

export type ConfigurableSettings = Omit<SettingsJSON, 'recent_files'>;
