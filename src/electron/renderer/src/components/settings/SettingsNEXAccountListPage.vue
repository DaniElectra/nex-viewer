<script setup lang="ts">
import { inject } from 'vue';
import SettingsHeader from '@renderer/components/settings/SettingsHeader.vue';
import Badge from '@renderer/components/Badge.vue';
import type { ConfigurableSettings } from '@/types/settings';

defineProps<{
	setPage: (_page: string, _data?: any) => void;
	onClose: () => unknown;
}>();

const settings = inject<ConfigurableSettings>('settings')!;

const platformBadgeColors = {
	'Wii U': 'bg-[#0096C8]/20 border-[#0096C8]',
	'3DS': 'bg-[#D12228]/20 border-[#D12228]'
};
</script>

<template>
	<div class="flex flex-col flex-1 min-h-0">
		<SettingsHeader :title="'NEX / Rendez-Vous Accounts'" :on-close="onClose" :go-back="() => setPage('main')" />
		<div class="overflow-y-auto">
			<div v-if="settings.accounts.length === 0" class="text-sm text-[#aab0bb] text-center py-8">
				No accounts saved
			</div>
			<button v-for="(account, i) in settings.accounts" v-else :key="i" class="w-full flex items-center gap-3 px-4 py-3 border-b border-[#2e3238] hover:bg-[#172030] hover:cursor-pointer last:border-b-0 text-left transition-colors" @click="() => setPage('nex-account', { index: i, account })">
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2">
						<span class="text-sm font-medium truncate">
							{{ account.username }}
						</span>
						<Badge v-if="account.type" :class="'text-[10px] px-1.5 py-0 h-4'">
							{{ account.type }}
						</Badge>
						<Badge v-if="account.platform" :class="`text-[10px] ${platformBadgeColors[account.platform] || ''}`">
							{{ account.platform }}
						</Badge>
					</div>
					<div class="flex items-center gap-3 text-xs text-[#aab0bb] mt-0.5">
						<span>PID: {{ account.pid }}</span>
					</div>
				</div>
			</button>
		</div>
	</div>
</template>
