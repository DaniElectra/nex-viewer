<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import ProtocolSelector from '@renderer/components/ProtocolSelector.vue';
import Badge from '@renderer/components/Badge.vue';

const search = ref('');
const packets = ref([]);
const props = defineProps<{
	selectedPacketId?: number;
}>();
const emit = defineEmits<{
	selectPacket: [packet: any];
}>();

const activeProtocols = ref<string[]>(['nex', 'hpp', 'http', 'npln']);

const filteredPackets = computed(() =>
	packets.value.filter((p) => {
		const matchesProtocol = activeProtocols.value.includes(p.protocol);
		const matchesSearch = search.value
			? JSON.stringify(p).toLowerCase().includes(search.value.toLowerCase())
			: true;
		return matchesProtocol && matchesSearch;
	})
);

function handleProtocolChange(protocols: string[]) {
	activeProtocols.value = protocols;
}

function addPacket(packet) {
	packets.value.push(packet);
}

function clear() {
	packets.value = [];
}

function getProtocolColor(protocol: string): string {
	const colorMap = {
		nex: 'bg-purple-900/20 text-purple-400 border-purple-800/50',
		hpp: 'bg-blue-900/20 text-blue-400 border-blue-800/50',
		http: 'bg-green-900/20 text-green-400 border-green-800/50',
		npln: 'bg-amber-900/20 text-amber-400 border-amber-800/50'
	};

	return colorMap[protocol] || '';
}

function getStatusColor(status: string | number | undefined, protocol: string) {
	if (status === undefined) {
		return '';
	}

	if ((protocol === 'http' || protocol === 'hpp') && typeof status === 'number') {
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
				<ProtocolSelector @protocol-change="handleProtocolChange" />
			</div>
			<!--
			<div class="flex items-center space-x-2">
				Filters
			</div>
			-->
		</div>
		<div class="relative">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-[#9a9fa9]" />
			<input v-model="search" type="search" placeholder="Search packets by protocol, source, destination, service, method..." class="w-full pl-8 pr-8 bg-[#121720] border border-[#2e3238] rounded-md py-2 text-sm text-[#F9FAFC] placeholder-[#9a9fa9] focus:outline-none">
		</div>
	</div>
	<div class="flex-1 overflow-auto">
		<table class="w-full text-sm">
			<thead class="sticky top-0 bg-[#151c27] z-10">
				<tr class="border-b border-[#2e3238]">
					<th class="w-44 px-4 py-3 text-left cursor-pointer">Time</th>
					<th class="w-24 px-4 py-3 text-left cursor-pointer">Protocol</th>
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
					<tr v-for="packet in filteredPackets" :key="packet.id" :class="[ 'border-b border-[#2e3238] cursor-pointer transition-colors', packet.id === props.selectedPacketId ? 'bg-[#182338] hover:bg-[#1a2740]' : 'hover:bg-[#172030]' ]" @click="emit('selectPacket', packet)">
						<td class="px-4 py-2 font-mono text-xs">{{ packet.time }}</td>
						<td class="px-4 py-2">
							<Badge :class="getProtocolColor(packet.protocol)">
								{{ packet.protocol?.toUpperCase() }}
							</Badge>
						</td>
						<td class="px-4 py-2 font-mono text-xs">{{ packet.source }}</td>
						<td class="px-4 py-2">
							<div class="flex flex-col">
								<span class="font-medium text-xs">{{ packet.display_domain || packet.destination }}</span>
								<span v-if="packet.display_path" class="text-xs text-[#9a9fa9] truncate max-w-40">
									{{ packet.display_path }}
								</span>
							</div>
						</td>
						<td class="px-4 py-2">
							<template v-if="packet.service && packet.method">
								<div class="font-medium text-xs">{{ packet.service }}</div>
								<div class="text-xs text-[#9a9fa9]">{{ packet.method }}</div>
							</template>
							<template v-else-if="packet.protocol === 'nex' && packet.original_packet.type">
								<Badge class="bg-purple-900/10 text-purple-400 border-purple-800/50">
									{{ packet.original_packet.type }}
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
							<Badge v-if="packet.status" :class="getStatusColor(packet.status, packet.protocol)">
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
