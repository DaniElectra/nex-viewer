<script setup lang="ts">
import RMCField from '@renderer/components/RMCField.vue';

const props = defineProps<{
	transaction: any | null;
	direction: 'Request' | 'Response';
}>();

// TODO - Like everything else with NPLN, this is a hack. Make this cleaner
function makeField(message) {
	return {
		__displayTypeName: 'Parameters',
		__fields: message
	};
}
</script>

<template>
	<div class="mb-4">
		<div class="text-lg font-medium">NPLN {{ direction }}</div>
	</div>
	<div v-for="(message, i) in (direction === 'Response' ? transaction.original_packet.response.messages : transaction.original_packet.request.messages)" class="space-y-1">
		<!-- * This probably shouldn't be treated as an RMC, but if we keep the same structure we should rename this component -->
		<RMCField :field-key="`Message ${Number(i)+1}`" :field="makeField(message)" :depth="0" />
	</div>
</template>