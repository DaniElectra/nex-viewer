export function copyToClipBoard(text: string): void {
	window.api.copyToClipboard(text);
}

export function copyHexToClipBoard(bytes: number[]): void {
	copyToClipBoard(bytes.map((b: number) => b.toString(16).padStart(2, '0')).join(''));
}

export function toHexString(bytes: number[]): string {
	return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}
