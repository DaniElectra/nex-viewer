<template>
	<div class="content-wrapper">
		<section id="header">
			<span
				id="header-title"
				class="no-select"
			>NEX Viewer</span>
			<input
				id="header-search"
				v-model="search"
				type="text"
				placeholder="Search..."
			>
		</section>
		<main class="container">
			<PacketsList
				ref="packetsRef"
				:search="search"
				@select="handleSelectPacket"
			/>
			<div class="hr no-select" />
			<PacketDetails :packet="selectedPacket" />
			<div class="vr no-select" />
			<ConnectionsList ref="connectionsRef" />
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PacketsList from '@renderer/components/PacketsList.vue';
import PacketDetails from '@renderer/components/PacketDetails.vue';
import ConnectionsList from '@renderer/components/ConnectionsList.vue';
import { initResizeables } from '@renderer/assets/js/resize';
import type SerializedPacket from '@/types/nex/serialized-packet';
import type SerializedConnection from '@/types/nex/serialized-connection';

const search = ref('');
const selectedPacket = ref<SerializedPacket | null>(null);
const packetsRef = ref<InstanceType<typeof PacketsList> | null>(null);
const connectionsRef = ref<InstanceType<typeof ConnectionsList> | null>(null);

function handleSelectPacket(packet: SerializedPacket) {
	selectedPacket.value = packet;
}

onMounted(() => {
	initResizeables();

	(window as any).addPacketToList = (packet: SerializedPacket) => {
		packetsRef.value?.addPacket(packet);
	};

	(window as any).addConnectionToList = (connection: SerializedConnection) => {
		connectionsRef.value?.addConnection(connection);
	};

	window.api.onClearSections(() => {
		packetsRef.value?.clear();
		connectionsRef.value?.clear();
	});

	window.api.onPacket((window as any).addPacketToList);

	window.api.onConnections((connections) => {
		for (const connection of connections) {
			(window as any).addConnectionToList(connection);
		}
	});

	window.api.ready();
});
</script>
