import type { EnhancedPacketBlock } from '@/types/pcapng-parser';

type SimpleFrame = {
	timestamp: {
		seconds: number;
		microseconds: number;
	};
	storedLength: number;
	realLength: number;
	data: Buffer;
};

type Frame = SimpleFrame | EnhancedPacketBlock;

export default Frame;