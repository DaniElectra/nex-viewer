import crypto from 'node:crypto';
import RC4Stream from '@/rc4';
import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStreamSettings from '@/types/nex/byte-stream-settings';

// * Only define the client ticket, since we can never decrypt the server ticket
export class Ticket {
	public sessionKey: Buffer;
	public target = new PID();

	private internal = new RVBuffer(); // TODO - Is this useful to expose?

	constructor(data: Buffer, key: Buffer, settings: NEXByteStreamSettings) {
		const decrypted = decrypt(data, key);

		const stream = new NEXByteStream(decrypted, settings);

		this.sessionKey = stream.read(settings.session_key_size);
		this.target.extractFrom(stream);
		this.internal.extractFrom(stream);
	}
}

export function keyDerivationOld(pid: bigint, password: string): Buffer {
	let key = Buffer.from(password);

	for (let i = 0n; i < 65000n + pid % 1024n; i++) {
		key = crypto.createHash('md5').update(key).digest();
	}

	return key;
}

export function keyDerivationNew(pid: bigint, password: string): Buffer {
	const passwordHash = crypto.createHash('md5').update(password).digest();

	const pidBuffer = Buffer.alloc(8);
	pidBuffer.writeBigUInt64LE(BigInt(pid), 0);

	return crypto.createHash('md5').update(Buffer.concat([
		passwordHash,
		pidBuffer
	])).digest();
}

// * We only need to decrypt and only once, so no point in implementing this as a class
function decrypt(data: Buffer, key: Buffer): Buffer {
	const checksumData = data.subarray(0, -0x10);
	const expectedChecksum = data.subarray(-0x10);
	const calculatedChecksum = crypto.createHmac('md5', key).update(checksumData).digest();

	if (!expectedChecksum.equals(calculatedChecksum)) {
		throw new Error('Invalid Kerberos checksum (incorrect password)');
	}

	const encrypted = data.subarray(0, -0x10);
	const decipher = new RC4Stream(key);

	return decipher.update(encrypted);
}