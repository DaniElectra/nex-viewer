<template>
	<section id="connections">
		<div
			v-for="connection in connections"
			:key="connection.title.name"
		>
			<span>{{ connection.title.name }}</span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type SerializedConnection from '@/types/nex/serialized-connection';

const connections = ref<SerializedConnection[]>([]);

function addConnection(connection: SerializedConnection) {
	connections.value.push(connection);
}

function clear() {
	connections.value = [];
}

defineExpose({ addConnection, clear });
</script>
