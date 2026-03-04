<script setup lang="ts">
import { useClipboard } from '@renderer/composables/useClipboard';
const { tooltip, tooltipKey } = useClipboard();
</script>

<template>
	<div v-if="tooltip" :key="tooltipKey" class="copied-tooltip fixed z-50 px-2.5 py-0.5 text-xs font-semibold border pointer-events-none select-none bg-[#132d28] text-green-400 border-[#0b4a2d] rounded" :style="{ left: `${tooltip.x}px`, top: `${tooltip.y - 8}px` }">
		Copied
	</div>
</template>

<style scoped>
.copied-tooltip {
	animation: pulse-fade 0.5s ease-out forwards;
}

@keyframes pulse-fade {
	0%   { opacity: 1; transform: translateX(-50%) translateY(-100%); }
	100% { opacity: 0; transform: translateX(-50%) translateY(-110%); }
}
</style>
