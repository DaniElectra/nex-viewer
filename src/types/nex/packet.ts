import PRUDPPacketV0 from '@/nex/prudp-packetv0';
import PRUDPPacketV1 from '@/nex/prudp-packetv1';
import RawRMCPacket from '@/nex/raw-rmc-packet';

type Packet = PRUDPPacketV0 | PRUDPPacketV1 | RawRMCPacket;

export default Packet;