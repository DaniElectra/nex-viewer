<script setup lang="ts">
import { toHexString } from '@renderer/assets/js/util';

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
			<p class="font-medium">PRUDPv1</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Source</h3>
			<p class="font-mono">{{ packet.source }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Destination</h3>
			<p class="font-mono">{{ packet.destination }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Source Stream Type</h3>
			<p class="font-mono">{{ packet.original_packet.source_stream_type }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Source Stream ID</h3>
			<p class="font-mono">{{ packet.original_packet.source_stream_id }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Destination Stream Type</h3>
			<p class="font-mono">{{ packet.original_packet.destination_stream_type }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Destination Stream ID</h3>
			<p class="font-mono">{{ packet.original_packet.destination_stream_id }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Type</h3>
			<p>{{ packet.original_packet.type }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Flags</h3>
			<p>{{ packet.original_packet.flags.join(', ') }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Session ID</h3>
			<p class="font-mono">{{ packet.original_packet.session_id }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Sequence ID</h3>
			<p class="font-mono">{{ packet.original_packet.sequence_id }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Substream ID</h3>
			<p class="font-mono">{{ packet.original_packet.substream_id }}</p>
		</div>
		<div v-if="packet.original_packet.fragment_id !== undefined && packet.original_packet.fragment_id !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Fragment ID</h3>
			<p class="font-mono">{{ packet.original_packet.fragment_id }}</p>
		</div>
		<div v-if="packet.original_packet.supported_functions !== undefined && packet.original_packet.supported_functions !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Supported Functions</h3>
			<p class="font-mono">{{ packet.original_packet.supported_functions.join(', ') }}</p>
		</div>
		<div v-if="packet.original_packet.initial_unreliable_sequence_id !== undefined && packet.original_packet.initial_unreliable_sequence_id !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Initial Unreliable Sequence ID</h3>
			<p class="font-mono">{{ packet.original_packet.initial_unreliable_sequence_id }}</p>
		</div>
		<div v-if="packet.original_packet.maximum_substream_id !== undefined && packet.original_packet.maximum_substream_id !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Maximum Substream ID</h3>
			<p class="font-mono">{{ packet.original_packet.maximum_substream_id }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Signature</h3>
			<p class="font-mono break-all">{{ toHexString(packet.original_packet.signature) }}</p>
		</div>
		<div v-if="packet.original_packet.connection_signature !== undefined && packet.original_packet.connection_signature !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Connection Signature</h3>
			<p class="font-mono break-all">{{ toHexString(packet.original_packet.connection_signature) }}</p>
		</div>
		<div v-if="packet.original_packet.nat_message_id !== undefined && packet.original_packet.nat_message_id !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Message ID</h3>
			<p class="font-mono break-all">{{ packet.original_packet.nat_message_id }}</p>
		</div>
		<div v-if="packet.original_packet.nat_connection_id !== undefined && packet.original_packet.nat_connection_id !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Connection ID</h3>
			<p class="font-mono break-all">{{ packet.original_packet.nat_connection_id }}</p>
		</div>
		<div v-if="packet.original_packet.nat_time !== undefined && packet.original_packet.nat_time !== null">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Time Counter</h3>
			<p class="font-mono break-all">{{ packet.original_packet.nat_time }}</p>
		</div>
	</div>
</template>
