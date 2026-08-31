<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	class?: string;
}>();
</script>

<template>
	<button :class="twMerge('transition-colors inline-flex items-center justify-center rounded-md hover:bg-[#182338] hover:cursor-pointer', props.class)">
		<slot />
	</button>
</template>
