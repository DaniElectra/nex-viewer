<script setup lang="ts">
import { inject, ref } from 'vue';
import { Save } from 'lucide-vue-next';
import SettingsHeader from '@renderer/components/settings/SettingsHeader.vue';
import IconButton from '@renderer/components/IconButton.vue';
import type { ConfigurableSettings } from '@/types/settings';

defineProps<{
	setPage: (_page: string, _data?: any) => void;
	onClose: () => unknown;
}>();

const settings = inject<ConfigurableSettings>('settings')!;

const port = ref<number>(Number(settings.proxy_port ?? 8080));

function save(): void {
	let p = Math.floor(Number(port.value) || 0);
	if (p < 1) p = 1;
	if (p > 65535) p = 65535;
	port.value = p;
	settings.proxy_port = p;
}

</script>

<template>
	<div class="flex flex-col flex-1 min-h-0">
		<SettingsHeader :title="'NPLN Proxy'" :on-close="onClose" :go-back="() => setPage('main')" />
		<div class="overflow-y-auto p-4 space-y-4">
			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">Proxy Port</label>
				<input class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#151c27] h-8 text-sm bg-[#1d222a] border border-[#2e3238] w-full rounded-md px-3 py-2" placeholder="Port" v-model="port" type="number" min="1" max="65535" >
			</div>
			<div class="flex gap-2 pt-2">
				<IconButton class="flex-1 h-9 text-sm border-2 border-blue-900 bg-blue-900/50 hover:bg-blue-800/50" @click="save">
					<Save class="h-3.5 w-3.5 mr-1.5" />
					Save Changes
				</IconButton>
			</div>
		</div>
	</div>
</template>
