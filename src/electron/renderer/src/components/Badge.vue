<script setup lang="ts">
const props = defineProps<{
	class?: string;
}>();
</script>

<template>
	<div :class="['inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', props.class]">
		<slot />
	</div>
</template>
