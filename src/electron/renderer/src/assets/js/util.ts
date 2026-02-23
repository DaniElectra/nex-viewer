export function copyHex(bytes: number[]): void {
	navigator.clipboard.writeText(bytes.map((b: number) => b.toString(16).padStart(2, '0')).join(''));
}

export function toHexString(bytes: number[]): string {
	return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}
