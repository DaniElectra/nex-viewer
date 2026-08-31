<script setup lang="ts">
defineProps<{
	onClick: () => unknown;
	label: string;
	description: string;
}>();
</script>

<template>
	<button class="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-[#2e3238] hover:bg-[#172030] hover:cursor-pointer last:border-b-0" @click="onClick">
		<div class="flex-1 min-w-0">
			<div class="text-sm font-medium">{{ label }}</div>
			<div class="text-xs text-[#aab0bb]">{{ description }}</div>
		</div>
	</button>
</template>
