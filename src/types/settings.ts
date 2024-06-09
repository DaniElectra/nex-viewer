export type Account = {
	username?: string;
	pid: number;
	password?: string;
	password_hash_old?: string;
	password_hash_new?: string;
}

export type Settings = {
	recent_files: string[];
	accounts: Account[];
}