<script setup lang="ts">
import SettingsHeader from '@renderer/components/settings/SettingsHeader.vue';
import SettingsPageOption from '@renderer/components/settings/SettingsPageOption.vue';

defineProps<{
	setPage: (_page: string) => void;
	onClose: () => unknown;
}>();
</script>

<template>
	<div>
		<SettingsHeader :title="'Settings'" :on-close="onClose" />
		<SettingsPageOption :label="'NEX / Rendez-Vous Accounts'" :description="'Manage Accounts'" :on-click="() => setPage('nex-account-list')" />
	</div>
</template>
