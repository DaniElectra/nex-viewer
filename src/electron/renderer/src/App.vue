<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { FolderOpen, Download, Cog, GripVertical } from 'lucide-vue-next';
import { Panel, PanelGroup, PanelResizeHandle } from 'vue-resizable-panels';
import NotificationStack from '@renderer/components/NotificationStack.vue';
import ClipboardCopier from '@renderer/components/ClipboardCopier.vue';
import SettingsPanel from '@renderer/components/settings/SettingsPanel.vue';
import IconButton from '@renderer/components/IconButton.vue';
import PacketsList from '@renderer/components/PacketsList.vue';
import PacketDetails from '@renderer/components/PacketDetails.vue';
import { useFileDrop } from '@renderer/composables/useFileDrop';
import type { SerializedMessage } from '@/types/serialized-message';
import type { ConfigurableSettings } from '@/types/settings';

const settingsPanel = ref<InstanceType<typeof SettingsPanel> | null>(null);
const packetsList = ref<InstanceType<typeof PacketsList> | null>(null);
const selectedPacket = ref<SerializedMessage | null>(null);
const settings = ref<ConfigurableSettings | null>(null);

function exportSession(): void {
	if (!packetsList.value) {
		return;
	}

	const packets = toRaw(packetsList.value.getPackets());
	window.api.exportSession(packets as SerializedMessage[]);
}

function openSelectSession(): void {
	window.api.openSelectSession();
}

const { isDragging } = useFileDrop((paths) => {
	window.api.openSession(paths[0]);
});

onMounted(() => {
	// * Clear up any leftover state from hot reloading
	packetsList.value?.clear();
	selectedPacket.value = null;

	window.api.onClearSections(() => {
		packetsList.value?.clear();
		selectedPacket.value = null;
	});

	window.api.onSetDumpLoadingstate((isLoading: boolean) => {
		packetsList.value.setLoading(isLoading);
	});

	window.api.onSerializedMessageList((messages: SerializedMessage[]) => {
		packetsList.value.setPackets(messages);
	});

	window.api.onSerializedMessage((message: SerializedMessage) => {
		packetsList.value?.addPacket(message);
	});

	window.api.onSerializedMessageUpdated((id: number, message: SerializedMessage) => {
		packetsList.value?.updatePacket(id, message);

		if (selectedPacket.value?.id === id) {
			selectedPacket.value = message;
		}
	});

	window.api.onSettings((newSettings: ConfigurableSettings) => {
		settings.value = newSettings;
	});

	window.api.onOpenSettings(() => {
		settingsPanel.value?.open();
	});

	window.api.ready();
});
</script>

<template>
	<NotificationStack />
	<ClipboardCopier />
	<SettingsPanel v-if="settings" ref="settingsPanel" :settings="settings" :on-close="() => settingsPanel?.close()" />
	<Transition enter-active-class="transition-all duration-100" enter-from-class="opacity-0" leave-active-class="transition-all duration-100" leave-to-class="opacity-0">
		<div v-if="isDragging" class="fixed inset-[2px] z-[100] flex items-center justify-center pointer-events-none border-2 border-dashed border-blue-500 bg-blue-500/10 rounded-xl">
			<span class="text-blue-400 text-2xl font-medium tracking-wide select-none">
				Drop file to open
			</span>
		</div>
	</Transition>
	<div class="h-screen flex flex-col">
		<!-- TODO - Remove the header? The "Settings" button is in the menu bar too, and removing the header would give the UI a bit more room. But, the menu bar uses IPC which is slower -->
		<header class="sticky top-0 z-50 w-full border-b border-[#2e3238] backdrop-blur-sm">
			<div class="flex h-16 items-center px-6">
				<div class="font-semibold tracking-tight text-xl">
					<span>Pretendo Network Viewer</span>
				</div>

				<div class="ml-auto flex items-center gap-4">
					<IconButton class="flex items-center gap-2 rounded-full border border-[#2e3238] px-4 py-2" @click="openSelectSession">
						<FolderOpen class="h-5 w-5" />
						<span>Open</span>
					</IconButton>

					<IconButton class="flex items-center gap-2 rounded-full border border-[#2e3238] px-4 py-2" @click="exportSession">
						<Download class="h-5 w-5" />
						<span>Export</span>
					</IconButton>

					<IconButton class="flex items-center gap-2 rounded-full border border-[#2e3238] px-4 py-2" @click="settingsPanel?.open">
						<Cog class="h-5 w-5" />
						<span>Settings</span>
					</IconButton>
				</div>
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
