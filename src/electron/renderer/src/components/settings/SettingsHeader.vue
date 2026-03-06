<script setup lang="ts">
import { ChevronLeft, X } from 'lucide-vue-next';
import IconButton from '@renderer/components/IconButton.vue';

defineProps<{
	title: string;
	goBack?: () => unknown;
	onClose: () => unknown;
}>();
</script>

<template>
	<div class="flex items-center h-14 px-4 border-b border-[#2e3238] flex-shrink-0">
		<IconButton v-if="goBack" :class="'mr-2 h-8 w-8'" variant="ghost" size="icon" @click="goBack"><ChevronLeft class="h-4 w-4" /></IconButton>
		<h2 class="text-base font-semibold">{{ title }}</h2>
		<IconButton :class="'ml-auto h-8 w-8'" @click="onClose"><X class="h-4 w-4" /></IconButton>
	</div>
</template>
