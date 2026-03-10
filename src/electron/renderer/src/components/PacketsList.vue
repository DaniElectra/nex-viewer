<script setup lang="ts">
import { ref, shallowRef, computed, nextTick } from 'vue';
import { useVirtualList, refDebounced } from '@vueuse/core';
import { Search, ArrowDownToLine } from 'lucide-vue-next';
import ProtocolSelector from '@renderer/components/TransportSelector.vue';
import Badge from '@renderer/components/Badge.vue';
import type { SerializedMessage } from '@/types/serialized-message';
import type { TransportType } from '@renderer/components/TransportSelector.vue';

const ROW_HEIGHT = 50;

const loading = ref(false);
const search = shallowRef('');
const searchDebounced = refDebounced(search, 300);
const packets = ref<SerializedMessage[]>([]);
const searchIndex = ref<Map<number, string>>(new Map());

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

const filteredPackets = computed(() => {
	const query = searchDebounced.value.toLowerCase();
	const transports = activeTransports.value;

	return packets.value.filter((message) => {
		if (!transports.includes(message.transport as TransportType)) {
			return false;
		}

		if (query) {
			return searchIndex.value.get(message.id)?.includes(query);
		}

		return true;
	});
});

const autoScroll = ref(false);

const { list, containerProps, wrapperProps } = useVirtualList(filteredPackets, {
	itemHeight: ROW_HEIGHT,
	overscan: 10
});

function scrollToBottom() {
	const el = containerProps.ref.value;
	if (el) {
		nextTick(() => {
			el.scrollTop = el.scrollHeight;
		});
	}
}

function buildSearchString(message: SerializedMessage): string {
	// TODO - Can this be better? I've always felt like this was kinda hacky
	return JSON.stringify(message).toLowerCase();
}

function handleTransportChange(transports: TransportType[]) {
	activeTransports.value = transports;
}

function addPacket(packet: SerializedMessage) {
	packets.value.push(packet);
	searchIndex.value.set(packet.id, buildSearchString(packet));

	if (autoScroll.value) {
		scrollToBottom();
	}
}

function updatePacket(id: number, updatedPacket: SerializedMessage) {
	packets.value[id] = updatedPacket;
	searchIndex.value.set(updatedPacket.id, buildSearchString(updatedPacket));
}

function getPackets() {
	return packets.value;
}

function setPackets(messages: SerializedMessage[]) {
	clear();

	for (const message of messages) {
		searchIndex.value.set(message.id, buildSearchString(message));
	}

	packets.value = messages;
}

function clear() {
	packets.value = [];
	searchIndex.value = new Map();
}

function setLoading(isLoading: boolean) {
	loading.value = isLoading;
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

		if (status.toLowerCase() === 'pending') {
			return 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50';
		}

		if (status.toLowerCase() === 'aborted') {
			return 'bg-gray-900/30 text-gray-400 border-gray-800/50';
		}
	}

	return '';
}

defineExpose({
	addPacket,
	updatePacket,
	getPackets,
	setPackets,
	clear,
	setLoading
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
		<div class="flex gap-2">
			<div class="relative flex-1">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-[#9a9fa9]" />
				<input v-model="search" type="search" placeholder="Search packets by transport protocol, source, destination, service, method..." class="w-full pl-8 pr-8 bg-[#121720] border border-[#2e3238] rounded-md py-2 text-sm text-[#F9FAFC] placeholder-[#9a9fa9] focus:outline-none">
			</div>
			<button class="flex items-center justify-center w-9 h-9 rounded-md border transition-colors" :class="autoScroll ? 'bg-blue-900/30 border-blue-700/50 text-blue-400' : 'bg-[#121720] border-[#2e3238] text-[#9a9fa9] hover:text-[#F9FAFC]'" :title="autoScroll ? 'Auto-scroll enabled' : 'Auto-scroll disabled'" @click="autoScroll = !autoScroll">
				<ArrowDownToLine class="h-4 w-4" />
			</button>
		</div>
	</div>

	<div class="flex-shrink-0 bg-[#151c27] border-b border-[#2e3238] z-10">
		<div class="flex w-full text-sm">
			<div class="w-44 px-4 py-3 text-left cursor-pointer">ID</div>
			<div class="w-44 px-4 py-3 text-left cursor-pointer">Elapsed Time</div>
			<div class="w-24 px-4 py-3 text-left cursor-pointer">Transport</div>
			<div class="flex-1 px-4 py-3 text-left cursor-pointer">Source</div>
			<div class="flex-1 px-4 py-3 text-left cursor-pointer">Destination</div>
			<div class="flex-1 px-4 py-3 text-left cursor-pointer">Service/Method</div>
			<div class="w-24 px-4 py-3 text-left cursor-pointer">Direction</div>
			<div class="w-28 px-4 py-3 text-left cursor-pointer">Status</div>
		</div>
	</div>

	<div v-if="loading" class="flex-1 flex items-center justify-center">
		<span class="flex text-center py-8 text-[#9a9fa9]">
			<!-- * Lucide has a spinner but it's not very good, so just using our own -->
			<svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
			Loading network dump...
		</span>
	</div>

	<div v-else-if="filteredPackets.length === 0" class="flex-1 flex items-center justify-center">
		<span class="text-center py-8 text-[#9a9fa9]">No packets to display</span>
	</div>

	<div v-else v-bind="containerProps" class="flex-1">
		<div v-bind="wrapperProps">
			<div v-for="{ data: packet } in list" :key="packet.id" class="flex items-center border-b border-[#2e3238] cursor-pointer transition-colors text-sm" :class="[ packet.stack_trace ? 'bg-red-900/40 hover:bg-red-900/50' : packet.id === props.selectedPacketId ? 'bg-[#182338] hover:bg-[#1a2740]' : 'hover:bg-[#172030]' ]" :style="{ height: `${ROW_HEIGHT}px` }" @click="emit('selectPacket', packet)">
				<div class="w-44 px-4 py-2 font-mono text-xs flex-shrink-0">{{ packet.id }}</div>
				<div class="w-44 px-4 py-2 font-mono text-xs flex-shrink-0">{{ packet.elapsed_time.toFixed(6) }}</div>
				<div class="w-24 px-4 py-2 flex-shrink-0">
					<Badge :class="transportBadgeColors[packet.transport] || ''">
						{{ packet.transport }}
					</Badge>
				</div>
				<div class="flex-1 px-4 py-2 font-mono text-xs">{{ packet.source }}</div>
				<div class="flex-1 px-4 py-2">
					<div class="flex flex-col">
						<span class="font-medium text-xs">{{ packet.destination }}</span>
						<span v-if="packet.destination_path" class="text-xs text-[#9a9fa9] truncate max-w-40">{{ packet.destination_path }}</span>
					</div>
				</div>
				<div class="flex-1 px-4 py-2">
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
				</div>
				<div class="w-24 px-4 py-2 flex-shrink-0">
					<span v-if="packet.direction" class="text-xs font-medium">
						{{ packet.direction.charAt(0).toUpperCase() + packet.direction.slice(1) }}
					</span>
					<span v-else class="text-[#9a9fa9]">—</span>
				</div>
				<div class="w-28 px-4 py-2 flex-shrink-0">
					<Badge v-if="packet.status" :class="getStatusColor(packet.status, packet.transport)">
						{{ String(packet.status) }}
					</Badge>
					<span v-else class="text-[#9a9fa9]">—</span>
				</div>
			</div>
		</div>
	</div>
</template>
