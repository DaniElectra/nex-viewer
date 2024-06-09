import type { EnhancedPacketBlock, SimplePacketBlock } from '@/types/pcapng-parser';

type SimpleFrame = {
	timestamp: {
		seconds: number;
		microseconds: number;
	};
	storedLength: number;
	realLength: number;
	data: Buffer;
};

type Frame = EnhancedPacketBlock | SimplePacketBlock | SimpleFrame;

export default Frame;