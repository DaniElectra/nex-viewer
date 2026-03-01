<script setup lang="ts">
defineProps<{
	transaction: any | null;
}>();
</script>

<template>
	<div class="grid grid-cols-2 gap-4">
		<div class="col-span-full">
			<h3 class="text-sm font-medium text-[#9a9fa9]">URI</h3>
			<p class="font-mono">{{ transaction.original_packet.uri }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Package</h3>
			<p class="font-mono">{{ transaction.original_packet.package_name }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Service</h3>
			<p class="font-mono">{{ transaction.original_packet.service_name }}</p>
		</div>
		<div>
			<h3 class="text-sm font-medium text-[#9a9fa9]">Method</h3>
			<p class="font-mono">{{ transaction.original_packet.method_name }}</p>
		</div>
		<div class="col-span-2">
			<h3 class="text-sm font-medium text-[#9a9fa9]">Method Path</h3>
			<p class="font-mono">{{ transaction.original_packet.method_path }}</p>
		</div>
	</div>
</template>