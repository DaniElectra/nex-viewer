<script setup lang="ts">
import { ref, inject, reactive, watch } from 'vue';
import { Save, Trash2, Eye, EyeOff } from 'lucide-vue-next';
import SettingsHeader from '@renderer/components/settings/SettingsHeader.vue';
import IconButton from '@renderer/components/IconButton.vue';
import type { Account, ConfigurableSettings } from '@/types/settings';

const props = defineProps<{
	pageData: {
		index: number;
		account: Account;
	};
	setPage: (_page: string) => void;
	onClose: () => unknown;
}>();

const platforms = [
	'Wii U',
	'3DS',
	'Other'
];
const accountTypes = [
	'NEX',
	'Rendez-Vous'
];

const settings = inject<ConfigurableSettings>('settings')!;
const form = reactive({
	username: '',
	pid: 0,
	password: '',
	platform: '',
	type: ''
});
const showPassword = ref(false);

// TODO - The "selected" states have no visible border, which doesn't really match up with the design style of the rest of the app
function getPlatformColor(platform: string): string {
	if (platform === 'Wii U') {
		if (form.platform === platform) {
			return 'bg-[#0096C8] border-[#0096C8]';
		} else {
			return 'bg-[#0096C8]/20 border-[#0096C8] hover:bg-[#0096C8]/40';
		}
	}

	if (platform === '3DS') {
		if (form.platform === platform) {
			return 'bg-[#D12228] border-[#D12228]';
		} else {
			return 'bg-[#D12228]/20 border-[#D12228] hover:bg-[#D12228]/40';
		}
	}

	if (platform === 'Other') {
		if (form.platform === platform) {
			return 'bg-[#6b7280] border-[#6b7280]';
		} else {
			return 'bg-[#6b7280]/20 border-[#6b7280] hover:bg-[#6b7280]/40';
		}
	}

	return '';
}

// TODO - The "selected" states have no visible border, which doesn't really match up with the design style of the rest of the app
function getAccountTypeColor(accountType: string): string {
	if (accountType === 'NEX') {
		if (form.type === accountType) {
			return 'bg-[#7c3aed] border-[#7c3aed]';
		} else {
			return 'bg-[#7c3aed]/20 border-[#7c3aed] hover:bg-[#7c3aed]/40';
		}
	}

	if (accountType === 'Rendez-Vous') {
		if (form.type === accountType) {
			return 'bg-[#059669] border-[#059669]';
		} else {
			return 'bg-[#059669]/20 border-[#059669] hover:bg-[#059669]/40';
		}
	}

	return '';
}

watch(() => props.pageData, (newData) => {
	if (newData?.account) {
		Object.assign(form, newData.account);
	}
}, {
	immediate: true
});
</script>

<template>
	<div>
		<SettingsHeader :title="'Account Settings'" :on-close="onClose" :go-back="() => setPage('nex-account-list')" />
		<div class="px-4 py-4 space-y-4">
			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">Username</label>
				<input v-model="form.username" class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#151c27] h-8 text-sm bg-[#1d222a] border border-[#2e3238] w-full rounded-md px-3 py-2" placeholder="Username">
			</div>

			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">PID</label>
				<input v-model="form.pid" class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#151c27] h-8 text-sm font-mono bg-[#1d222a] border border-[#2e3238] w-full rounded-md px-3 py-2" placeholder="1800000000">
			</div>

			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">Platform</label>
				<div class="flex gap-1">
					<button v-for="platform in platforms" :key="platform" class="border rounded-md text-xs h-7 px-2.5 hover:cursor-pointer" :class="getPlatformColor(platform)" @click="() => form.platform = platform">
						{{ platform }}
					</button>
				</div>
			</div>

			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">Account Type</label>
				<div class="flex gap-1">
					<button v-for="accountType in accountTypes" :key="accountType" class="border rounded-md text-xs h-7 px-2.5 hover:cursor-pointer" :class="getAccountTypeColor(accountType)" @click="() => form.type = accountType">
						{{ accountType }}
					</button>
				</div>
			</div>

			<div class="space-y-1.5">
				<label class="block text-xs font-medium text-[#aab0bb] uppercase tracking-wider">Password</label>
				<div class="relative">
					<input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="h-8 text-sm bg-[#1d222a] border border-[#2e3238] w-full rounded-md px-3 py-2 pr-8">
					<button class="absolute right-2 top-1/2 -translate-y-1/2 text-[#aab0bb] hover:text-white transition-colors" @click="showPassword = !showPassword">
						<Eye v-if="!showPassword" class="h-3.5 w-3.5" />
						<EyeOff v-else class="h-3.5 w-3.5" />
					</button>
				</div>
			</div>

			<div class="flex gap-2 pt-2">
				<IconButton class="flex-1 h-9 text-sm border-2 border-blue-900 bg-blue-900/50 hover:bg-blue-800/50" @click="() => Object.assign(settings.accounts[pageData.index], form)">
					<Save class="h-3.5 w-3.5 mr-1.5" />
					Save Changes
				</IconButton>
				<IconButton class="h-9 rounded-md px-3 border-2 border-red-900 bg-red-900/50 hover:bg-red-800/50">
					<Trash2 class="h-3.5 w-3.5" />
				</IconButton>
			</div>
		</div>
	</div>
</template>
