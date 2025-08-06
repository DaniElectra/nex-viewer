<template>
	<section id="packet-details">
		<details v-if="packet">
			<pre>{{ formatted }}</pre>
		</details>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type SerializedPacket from '@/types/nex/serialized-packet';

const props = defineProps<{ packet: SerializedPacket | null }>();
const formatted = computed(() =>
	props.packet ? JSON.stringify(props.packet, null, '\t') : ''
);
</script>
