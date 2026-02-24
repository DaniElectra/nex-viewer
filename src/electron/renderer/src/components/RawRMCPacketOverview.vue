<script setup lang="ts">
defineProps<{
	packet: any | null;
}>();
</script>

<template>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Elapsed Time</h3>
			<p class="font-mono">{{ packet.elapsed_time }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Protocol</h3>
			<p class="font-medium">HokakuCTR Raw MRC</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Source</h3>
			<p class="font-mono">{{ packet.source }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Destination</h3>
			<p class="font-mono">{{ packet.destination }}</p>
		</div>
	</div>
</template>
