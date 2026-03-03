import type PRUDPPacket from '@/types/nex/prudp-packet';

type ServiceProtocol = {
	ID: number;
	Name: string;

	handlePacket(packet: PRUDPPacket): void;
};

export default ServiceProtocol;
