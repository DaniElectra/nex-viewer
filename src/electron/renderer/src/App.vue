<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { /* FolderOpen, Download, */ GripVertical } from 'lucide-vue-next';
import { Panel, PanelGroup, PanelResizeHandle } from 'vue-resizable-panels';
import PacketsList from '@renderer/components/PacketsList.vue';
import PacketDetails from '@renderer/components/PacketDetails.vue';
import RMCMessage from '@/nex/rmc-message';
import { SerializedMessage } from '@/types/serialized-message';

const packetsList = ref<InstanceType<typeof PacketsList> | null>(null);
const selectedPacket = ref<SerializedMessage | null>(null); // TODO - Strongly type this

onMounted(() => {
	window.api.onClearSections(() => {
		packetsList.value?.clear();
		selectedPacket.value = null;
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

	window.api.onSerializedMessage((message: SerializedMessage) => {
		packetsList.value?.addPacket(message);
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
