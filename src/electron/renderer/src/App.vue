<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { /* FolderOpen, Download, */ GripVertical } from 'lucide-vue-next';
import { Panel, PanelGroup, PanelResizeHandle } from 'vue-resizable-panels';
import PacketsList from '@renderer/components/PacketsList.vue';
import PacketDetails from '@renderer/components/PacketDetails.vue';
import RMCMessage from '@/nex/rmc-message';

const packetsList = ref<InstanceType<typeof PacketsList> | null>(null);
const selectedPacket = ref<Record<string, any> | null>(null); // TODO - Strongly type this

onMounted(() => {
	window.api.onClearSections(() => {
		packetsList.value?.clear();
		selectedPacket.value = null;
	});

	window.api.onPacket((packet) => {
		const packetData: Record<string, any> = {
			id: packet.id,
			original_packet: packet,
			elapsed_time: packet.elapsed_time?.toFixed(6),
			protocol: 'nex',
			source: `${packet.source_address}:${packet.source_port}`,
			destination: `${packet.destination_address}:${packet.destination_port}`,
			display_domain: null,
			display_path: null
		};

		if (packet.message) {
			packetData.service = packet.message.protocol_name;
			packetData.method = packet.message.method_name;
			packetData.direction = packet.message.type === RMCMessage.REQUEST ? 'REQUEST' : 'RESPONSE';

			if (packet.message.error) {
				packetData.status = `${packet.message.error.name} (0x${packet.message.error.code.toString(16)})`;
			} else {
				packetData.status = 'SUCCESS';
			}

			packetData.rmc = packet.message;
		}

		if (packet.original_buffer) {
			packetData.original_buffer = packet.original_buffer;
		}

		if (packet.decrypted_payload) {
			packetData.decrypted_payload = packet.decrypted_payload;
		}

		if (packet.defragmented_payload) {
			packetData.defragmented_payload = packet.defragmented_payload;
		}

		packetsList.value?.addPacket(packetData);
	});

	window.api.onNPLNTransaction((transaction) => {
		const url = new URL(transaction.uri)
		const packetData: Record<string, any> = {
			id: 0,
			original_packet: transaction,
			elapsed_time: 0,
			protocol: 'npln',
			source: 'Client',
			destination: `${url.protocol}//${url.hostname}`,
			service: transaction.fully_qualified_service_name,
			method: transaction.method_name,
			request_body: transaction.request.body,
			response_body: transaction.response.body,
		};

		packetsList.value?.addPacket(packetData);
	});

	window.api.ready();
});
</script>

<template>
	<div class="h-screen flex flex-col">
		<header class="sticky top-0 z-50 w-full border-b border-[#2e3238] backdrop-blur-sm">
			<div class="flex h-16 items-center px-6">
				<div class="font-semibold tracking-tight text-xl">
					<span>NEX Viewer</span>
				</div>
				<!--
				<div class="ml-auto flex items-center gap-4">
					<button class="flex items-center gap-2 rounded-full border border-[#2e3238] px-4 py-2">
						<FolderOpen class="h-5 w-5" />
						<span>Open</span>
					</button>

					<button class="flex items-center gap-2 rounded-full border border-[#2e3238] px-4 py-2">
						<Download class="h-5 w-5" />
						<span>Export</span>
					</button>
				</div>
				-->
			</div>
		</header>
		<main class="flex-1 overflow-hidden">
			<PanelGroup direction="vertical">
				<Panel>
					<div class="h-full overflow-hidden p-4">
						<div class="rounded-lg border border-[#2e3238] bg-[#151c27] h-full flex flex-col overflow-hidden">
							<PacketsList ref="packetsList" :selected-packet-id="selectedPacket?.id" @select-packet="selectedPacket = $event" />
						</div>
					</div>
				</Panel>
				<PanelResizeHandle class="h-px bg-[#2e3238] flex items-center justify-center">
					<div class="z-10 flex h-3 w-4 items-center justify-center rounded-sm border border-[#2e3238] bg-[#2e3238]">
						<GripVertical class="h-2.5 w-2.5 rotate-90" />
					</div>
				</PanelResizeHandle>
				<Panel>
					<div class="h-full overflow-hidden p-4">
						<div class="rounded-lg border border-[#2e3238] bg-[#151c27] h-full flex flex-col overflow-hidden">
							<PacketDetails :packet="selectedPacket" />
						</div>
					</div>
				</Panel>
			</PanelGroup>
		</main>
	</div>
</template>
