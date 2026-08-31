<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import { useNotifications } from '@renderer/composables/useNotifications';
import SettingsMainPage from '@renderer/components/settings/SettingsMainPage.vue';
import SettingsNEXAccountListPage from '@renderer/components/settings/SettingsNEXAccountListPage.vue';
import SettingsNEXAccountPage from '@renderer/components/settings/SettingsNEXAccountPage.vue';
import SettingsNPLNProxyPage from '@renderer/components/settings/SettingsNPLNProxyPage.vue';
import type { ConfigurableSettings } from '@/types/settings';

const props = defineProps<{
	settings: ConfigurableSettings;
	onClose: () => unknown;
}>();

const showPanel = ref<boolean>(false);
const currentPage = ref<string>('main');
const currentPageData = ref<any>();

const { notify } = useNotifications();

function open(): void {
	showPanel.value = true;
}

function close(): void {
	setPage('main');
	showPanel.value = false;
}

function setPage(page: string, data?: any): void {
	currentPage.value = page;

	if (data) {
		currentPageData.value = data;
	}
}

provide('settings', props.settings);

watch(props.settings, (newSettings: ConfigurableSettings) => {
	window.api.saveSettings(JSON.stringify(newSettings));
	notify('Settings saved successfully.');
}, {
	deep: true
});

defineExpose({
	open,
	close
});
</script>

<template>
	<Transition enter-active-class="transition-all duration-100" enter-from-class="opacity-0" leave-active-class="transition-all duration-100" leave-to-class="opacity-0">
		<div v-if="showPanel" class="fixed inset-0 z-50 backdrop-blur-sm" @click="onClose" />
	</Transition>
	<Transition enter-active-class="transition-all duration-100" enter-from-class="opacity-0 scale-95" leave-active-class="transition-all duration-100" leave-to-class="opacity-0 scale-95">
		<div v-if="showPanel" class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
			<div class="relative z-10 w-[420px] max-h-[520px] rounded-lg border border-[#2e3238] bg-[#151c27] shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
				<SettingsMainPage v-show="currentPage === 'main'" :on-close="onClose" :set-page="setPage" />
				<SettingsNEXAccountListPage v-show="currentPage === 'nex-account-list'" :on-close="onClose" :set-page="setPage" />
				<SettingsNEXAccountPage v-show="currentPage === 'nex-account'" :page-data="currentPageData || {}" :on-close="onClose" :set-page="setPage" />
				<SettingsNPLNProxyPage v-show="currentPage === 'npln-proxy-settings'" :on-close="onClose" :set-page="setPage" />
			</div>
		</div>
	</Transition>
</template>
