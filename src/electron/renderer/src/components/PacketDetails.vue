<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import RawRMCPacketOverview from '@renderer/components/RawRMCPacketOverview.vue';
import PRUDPV0PacketOverview from '@renderer/components/PRUDPV0PacketOverview.vue';
import PRUDPV1PacketOverview from '@renderer/components/PRUDPV1PacketOverview.vue';
import PRUDPLitePacketOverview from '@renderer/components/PRUDPLitePacketOverview.vue';
import NPLNTransactionOverview from '@renderer/components/NPLNTransactionOverview.vue';
import NPLNMessage from '@renderer/components/NPLNMessage.vue';
import RMCField from '@renderer/components/RMCField.vue';
import { copyHex } from '@renderer/assets/js/util';

const props = defineProps<{
	packet: any | null;
}>();

const activeTab = ref('overview');

let rmcData: {
	header: {
		__displayTypeName: string;
		__fields: Record<string, any>;
	};
	parameters: any;
};

const tabs = computed(() => {
	const t = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'hex', label: 'Hex View' }
	];

	if (props.packet?.rmc) {
		t.push({ id: 'rmc', label: 'RMC' });
	}

	if (props.packet?.protocol === 'npln') {
		t.push({ id: 'npln_request', label: 'Request' });
		t.push({ id: 'npln_response', label: 'Response' });
	}

	if (props.packet?.original_packet?.stack_trace) {
		t.push({ id: 'stack_trace', label: 'Stack Trace' });
	}

	return t;
});

watch(() => props.packet, () => {
	activeTab.value = 'overview';

	if (props.packet.rmc) {
		rmcData = {
			header: {
				__displayTypeName: 'RMC Header',
				__fields: {
					type: {
						__displayTypeName: 'UInt8',
						__value: props.packet.rmc.type
					},
					protocol_id: {
						__displayTypeName: 'UInt8',
						__value: props.packet.rmc.protocol_id
					},
					protocol_name: {
						__displayTypeName: 'String',
						__value: props.packet.rmc.protocol_name
					},
					method_id: {
						__displayTypeName: 'UInt8',
						__value: props.packet.rmc.method_id
					},
					method_name: {
						__displayTypeName: 'String',
						__value: props.packet.rmc.method_name
					},
					call_id: {
						__displayTypeName: 'UInt32',
						__value: props.packet.rmc.call_id
					}
				}
			},
			parameters: {
				__displayTypeName: 'Parameters',
				__fields: props.packet.rmc.parameters
			}
		};
	} else {
		rmcData = null;
	}
});
</script>

<template>
	<div v-if="!packet" class="h-full flex items-center justify-center">
		<p class="text-[#9a9fa9]">Select a packet to view details</p>
	</div>

	<div v-else class="h-full flex flex-col overflow-hidden">
		<div class="pb-2 flex-shrink-0 p-4">
			<h3 class="text-lg font-semibold leading-none tracking-tight">Packet Details</h3>
		</div>

		<div class="flex-1 flex flex-col overflow-hidden">
			<div class="flex border-b border-[#2e3238] flex-shrink-0">
				<button v-for="tab in tabs" :key="tab.id" class="px-4 py-2 text-sm border-b-2 transition-colors" :class="activeTab === tab.id ? 'border-blue-500 text-[#F9FAFC]' : 'border-transparent text-[#9a9fa9] hover:text-[#F9FAFC]'" @click="activeTab = tab.id">
					{{ tab.label }}
				</button>
			</div>

			<div class="flex-1 overflow-auto p-4">
				<div v-if="activeTab === 'overview'">
					<RawRMCPacketOverview v-if="packet.original_packet?.version === -1" :packet="packet" />
					<PRUDPV0PacketOverview v-else-if="packet.original_packet?.version === 0" :packet="packet" />
					<PRUDPV1PacketOverview v-else-if="packet.original_packet?.version === 1" :packet="packet" />
					<PRUDPLitePacketOverview v-else-if="packet.original_packet?.version === 2" :packet="packet" />
					<NPLNTransactionOverview v-else-if="packet.protocol === 'npln'" :transaction="packet" />
				</div>

				<div v-else-if="activeTab === 'hex'" class="font-mono text-xs">
					<div
						v-for="section in [
							{ key: 'original_buffer', label: 'Packet' },
							{ key: 'decrypted_payload', label: 'Decrypted Payload' },
							{ key: 'defragmented_payload', label: 'Defragmented Payload' },
							{ key: 'request_body', label: 'Request Body' },
							{ key: 'response_body', label: 'Response Body' }
						]" :key="section.key" class="mb-6 last:mb-0"
					>
						<template v-if="packet[section.key]?.length">
							<div class="flex items-center gap-2 mb-2">
								<div class="text-sm font-medium text-[#F9FAFC]">{{ section.label }}</div>
								<button class="text-xs text-[#9a9fa9] hover:text-[#F9FAFC] transition-colors cursor-pointer" @click="copyHex(packet[section.key])">Copy hex</button>
							</div>
							<div v-for="(row, rowIndex) in Array.from({ length: Math.ceil(packet[section.key].length / 16) }, (_, i) => packet[section.key].slice(i * 16, i * 16 + 16))" :key="rowIndex" class="flex gap-4 mb-0.5">
								<span class="text-[#9a9fa9] w-10 flex-shrink-0">{{ (rowIndex * 16).toString(16).padStart(4, '0') }}</span>
								<span class="flex gap-1">
									<span v-for="(byte, byteIndex) in row" :key="byteIndex" class="w-5 text-center text-[#F9FAFC]">{{ byte.toString(16).padStart(2, '0') }}</span>
									<span v-for="i in (16 - row.length)" :key="`pad-${i}`" class="w-5" />
								</span>
								<span class="text-[#9a9fa9] flex-shrink-0">
									<span v-for="(byte, byteIndex) in row" :key="byteIndex">{{ byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.' }}</span>
								</span>
							</div>
						</template>
					</div>
				</div>

				<div v-else-if="activeTab === 'rmc' && rmcData" class="font-mono text-xs">
					<div class="mb-4">
						<div class="text-lg font-medium">RMC Message</div>
						<div class="text-sm text-[#9a9fa9]">
							Protocol: {{ packet.rmc.protocol_name || 'Unknown' }},
							Method: {{ packet.rmc.method_name || 'Unknown' }}
						</div>
					</div>
					<div class="space-y-1">
						<RMCField :field-key="'Header'" :field="rmcData.header" :depth="0" />
						<RMCField :field-key="'Parameters'" :field="rmcData.parameters" :depth="0" />
					</div>
				</div>

				<!-- TODO - Is this really the best way to structure this? -->
				<div v-else-if="activeTab === 'npln_request'" class="font-mono text-xs">
					<NPLNMessage :transaction="packet" :direction="'Request'" />
				</div>

				<div v-else-if="activeTab === 'npln_response'" class="font-mono text-xs">
					<NPLNMessage :transaction="packet" :direction="'Response'" />
				</div>

				<div v-else-if="activeTab === 'stack_trace' && packet.original_packet.stack_trace" class="font-mono text-xs">
					<div class="mb-4">
						<div class="text-lg font-medium">Stack Trace</div>
					</div>
					<pre class="text-[#F9FAFC] whitespace-pre-wrap break-all">{{ packet.original_packet.stack_trace }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>
