<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import ProtocolSelector from '@renderer/components/TransportSelector.vue';
import Badge from '@renderer/components/Badge.vue';
import type { SerializedMessage } from '@/types/serialized-message';
import type { TransportType } from '@renderer/components/TransportSelector.vue';

const search = ref('');
const packets = ref<SerializedMessage[]>([]);
const props = defineProps<{
	selectedPacketId?: number;
}>();
const emit = defineEmits<{
	selectPacket: [packet: any];
}>();

const transportBadgeColors = {
	NEX: 'bg-purple-900/20 text-purple-400 border-purple-800/50',
	RMC: 'bg-rose-900/20 text-rose-400 border-rose-800/50', // * Used only by HokakuCTR raw RMC dumps
	NetZ: 'bg-cyan-900/20 text-cyan-400 border-cyan-800/50',
	PIA: 'bg-indigo-900/20 text-indigo-400 border-indigo-800/50',
	HPP: 'bg-blue-900/20 text-blue-400 border-blue-800/50',
	HTTP: 'bg-green-900/20 text-green-400 border-green-800/50',
	NPLN: 'bg-amber-900/20 text-amber-400 border-amber-800/50'
};

const activeTransports = ref<TransportType[]>(Object.keys(transportBadgeColors) as TransportType[]);

const filteredPackets = computed(() =>
	packets.value.filter((p) => {
		const matchesTransport = activeTransports.value.includes(p.transport as TransportType);
		const matchesSearch = search.value
			? JSON.stringify(p).toLowerCase().includes(search.value.toLowerCase())
			: true;
		return matchesTransport && matchesSearch;
	})
);

function handleTransportChange(transports: TransportType[]) {
	activeTransports.value = transports;
}

function addPacket(packet) {
	packets.value.push(packet);
}

function clear() {
	packets.value = [];
}

function getStatusColor(status: string | number | undefined, transport: string) {
	if (status === undefined) {
		return '';
	}

	if ((transport === 'HTTP' || transport === 'HPP') && typeof status === 'number') {
		if (status >= 200 && status < 300) {
			return 'bg-green-900/30 text-green-400 border-green-800/50';
		}

		if (status >= 300 && status < 400) {
			return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
		}

		if (status >= 400) {
			return 'bg-red-900/30 text-red-400 border-red-800/50';
		}

		return '';
	}

	if (typeof status === 'string') {
		if (status.toLowerCase() === 'success') {
			return 'bg-green-900/30 text-green-400 border-green-800/50';
		}

		if (status.toLowerCase() === 'error') {
			return 'bg-red-900/30 text-red-400 border-red-800/50';
		}
	}

	return '';
}

defineExpose({
	addPacket,
	clear
});
</script>

<template>
	<div class="flex flex-col p-4 gap-3 flex-shrink-0 border-b border-[#2e3238]">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<ProtocolSelector @transport-change="handleTransportChange" />
			</div>
			<!--
			<div class="flex items-center space-x-2">
				Filters
			</div>
			-->
		</div>
		<div class="relative">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-[#9a9fa9]" />
			<input v-model="search" type="search" placeholder="Search packets by transport protocol, source, destination, service, method..." class="w-full pl-8 pr-8 bg-[#121720] border border-[#2e3238] rounded-md py-2 text-sm text-[#F9FAFC] placeholder-[#9a9fa9] focus:outline-none">
		</div>
	</div>
	<div class="flex-1 overflow-auto">
		<table class="w-full text-sm">
			<thead class="sticky top-0 bg-[#151c27] z-10">
				<tr class="border-b border-[#2e3238]">
					<th class="w-44 px-4 py-3 text-left cursor-pointer">Elapsed Time</th>
					<th class="w-24 px-4 py-3 text-left cursor-pointer">Transport</th>
					<th class="px-4 py-3 text-left cursor-pointer">Source</th>
					<th class="px-4 py-3 text-left cursor-pointer">Destination</th>
					<th class="px-4 py-3 text-left cursor-pointer">Service/Method</th>
					<th class="w-24 px-4 py-3 text-left cursor-pointer">Direction</th>
					<th class="w-28 px-4 py-3 text-left cursor-pointer">Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="filteredPackets.length === 0">
					<td colspan="7" class="text-center py-8 text-[#9a9fa9]">
						No packets to display
					</td>
				</tr>
				<template v-else>
					<tr v-for="packet in filteredPackets" :key="packet.id" :class="[ 'border-b border-[#2e3238] cursor-pointer transition-colors', packet.stack_trace ? 'bg-red-900/40 hover:bg-red-900/50' : packet.id === props.selectedPacketId ? 'bg-[#182338] hover:bg-[#1a2740]' : 'hover:bg-[#172030]' ]" @click="emit('selectPacket', packet)">
						<td class="px-4 py-2 font-mono text-xs">{{ packet.elapsed_time.toFixed(6) }}</td>
						<td class="px-4 py-2">
							<Badge :class="transportBadgeColors[packet.transport] || ''">
								{{ packet.transport }}
							</Badge>
						</td>
						<td class="px-4 py-2 font-mono text-xs">{{ packet.source }}</td>
						<td class="px-4 py-2">
							<div class="flex flex-col">
								<span class="font-medium text-xs">{{ packet.destination }}</span>
								<span v-if="packet.destination_path" class="text-xs text-[#9a9fa9] truncate max-w-40">{{ packet.destination_path }}</span>
							</div>
						</td>
						<td class="px-4 py-2">
							<template v-if="packet.service && packet.method">
								<div class="font-medium text-xs">{{ packet.service }}</div>
								<div class="text-xs text-[#9a9fa9]">{{ packet.method }}</div>
							</template>
							<template v-else-if="packet.method">
								<Badge class="bg-blue-900/10 text-blue-400 border-blue-800/50">
									{{ packet.method }}
								</Badge>
							</template>
							<span v-else class="text-[#9a9fa9]">—</span>
						</td>
						<td class="px-4 py-2">
							<span v-if="packet.direction" class="text-xs font-medium">
								{{ packet.direction.charAt(0).toUpperCase() + packet.direction.slice(1) }}
							</span>
							<span v-else class="text-[#9a9fa9]">—</span>
						</td>
						<td class="px-4 py-2">
							<Badge v-if="packet.status" :class="getStatusColor(packet.status, packet.transport)">
								{{ String(packet.status) }}
							</Badge>
							<span v-else class="text-[#9a9fa9]">—</span>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>
