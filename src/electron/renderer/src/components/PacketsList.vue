<template>
	<section id="packets">
		<table id="packet-list">
			<thead>
				<tr>
					<th>Time</th>
					<th>Source</th>
					<th>Destination</th>
					<th>Version</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="packet in filteredPackets"
					:key="packet.id"
					:data-serialized="JSON.stringify(packet)"
					:class="{ selected: selected?.id === packet.id, error: packet.stack_trace }"
					@click="selectPacket(packet)"
				>
					<td>{{ packet.time?.toFixed(6) }}</td>
					<td>{{ packet.source_address }}</td>
					<td>{{ packet.destination_address }}</td>
					<td>{{ packet.version === -1 ? 'Raw RMC' : `v${packet.version}` }}</td>
					<td>{{ formatInfo(packet) }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import RMCMessage from '@/nex/rmc-message';
import type SerializedPacket from '@/types/nex/serialized-packet';

const props = defineProps<{ search: string }>();
const emit = defineEmits<{ (e: 'select', packet: SerializedPacket): void }>();

const packets = ref<SerializedPacket[]>([]);
const selected = ref<SerializedPacket | null>(null);

function addPacket(packet: SerializedPacket) {
	packets.value.push(packet);
}

function formatInfo(packet: SerializedPacket): string {
	const info: string[] = [];

	if (packet.version !== -1) {
		info.push(packet.type);

		if (packet.flags.includes('MULTI_ACK')) {
			info.push('MULTI_ACK');
		} else {
			info.push(`SEQ=${packet.sequence_id}`);
			if (packet.flags.includes('ACK')) {
				info.push('ACK');
			}
		}

		if (
			packet.type === 'DATA' &&
			!packet.flags.includes('ACK') &&
			!packet.flags.includes('MULTI_ACK')
		) {
			info.push(`FRAGMENT=${packet.fragment_id}`);
		}
	}

	if (packet.message) {
		info.push(`${packet.message.protocol_name}->${packet.message.method_name}`);
		info.push(packet.message.type === RMCMessage.REQUEST ? 'REQUEST' : 'RESPONSE');

		if (packet.message.error) {
			info.push('FAILURE');
			info.push(`ERROR ${packet.message.error.name} (0x${packet.message.error.code.toString(16)})`);
		} else {
			info.push('SUCCESS');
		}
	}

	return info.join(', ');
}

function selectPacket(packet: SerializedPacket) {
	selected.value = packet;
	emit('select', packet);
}

const filteredPackets = computed(() =>
	props.search
		? packets.value.filter(p =>
				JSON.stringify(p).toLowerCase().includes(props.search.toLowerCase())
			)
		: packets.value
);

function clear() {
	packets.value = [];
}

defineExpose({ addPacket, clear });
</script>
