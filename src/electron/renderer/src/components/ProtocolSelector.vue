<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronDown, Check } from 'lucide-vue-next';

type Protocol = 'nex' | 'hpp' | 'http' | 'npln';

const emit = defineEmits<{
	protocolChange: [protocols: Protocol[]];
}>();

const open = ref(false);
const container = ref<HTMLElement | null>(null);
const selected = ref<Record<Protocol | 'all', boolean>>({
	all: true,
	nex: false,
	hpp: false,
	http: false,
	npln: false
});

const protocols: Array<{ id: Protocol; name: string }> = [
	{ id: 'nex', name: 'NEX' },
	{ id: 'hpp', name: 'HPP' },
	{ id: 'http', name: 'HTTP' },
	{ id: 'npln', name: 'NPLN' }
];

function getSelectedLabel() {
	if (selected.value.all) {
		return 'All';
	}

	return Object.entries(selected.value).filter(([key, value]) => key !== 'all' && value).length.toString();
}

function toggleProtocol(protocol: Protocol | 'all') {
	if (protocol === 'all') {
		Object.keys(selected.value).forEach((key) => {
			selected.value[key as Protocol | 'all'] = key === 'all';
		});

		open.value = false;
	} else {
		selected.value[protocol] = !selected.value[protocol];
		selected.value.all = false;

		const hasSelected = Object.entries(selected.value).some(([key, value]) => key !== 'all' && value);

		if (!hasSelected) {
			selected.value.all = true;
			open.value = false;
		}
	}

	const active: Protocol[] = selected.value.all
		? ['nex', 'hpp', 'http', 'npln']
		: (Object.entries(selected.value).filter(([key, value]) => key !== 'all' && value).map(([key]) => key) as Protocol[]);

	emit('protocolChange', active);
}

function handleClickOutside(e: MouseEvent) {
	if (container.value && !container.value.contains(e.target as Node)) {
		open.value = false;
	}
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<template>
	<div ref="container" class="relative">
		<button class="flex items-center justify-between w-full border border-[#2e3238] rounded-md px-3 py-2 text-sm" @click="open = !open">
			<span>Protocols ({{ getSelectedLabel() }})</span>
			<ChevronDown class="h-4 w-4 opacity-50" />
		</button>

		<div v-if="open" class="absolute z-50 mt-1 w-52 rounded-md border border-[#2e3238] bg-[#151c27] shadow-lg p-1">
			<div class="px-2 py-1.5 text-sm font-semibold">Select Protocols</div>
			<div class="h-px bg-[#2e3238] my-1" />
			<div class="relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm cursor-pointer hover:bg-[#182338]" @click="toggleProtocol('all')">
				<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
					<Check v-if="selected.all" class="h-4 w-4" />
				</span>
				All
			</div>
			<div class="h-px bg-[#2e3238] my-1" />
			<div v-for="protocol in protocols" :key="protocol.id" class="relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm cursor-pointer hover:bg-[#182338]" @click="toggleProtocol(protocol.id)">
				<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
					<Check v-if="selected[protocol.id]" class="h-4 w-4" />
				</span>
				{{ protocol.name }}
			</div>
		</div>
	</div>
</template>
