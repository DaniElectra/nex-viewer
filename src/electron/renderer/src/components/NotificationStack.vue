<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';
import { useNotifications } from '@renderer/composables/useNotifications';
import type { NotificationType } from '@renderer/composables/useNotifications';

const { notifications, dismiss } = useNotifications();

function getTypeColor(type: NotificationType) {
	if (type === 'success') {
		return 'bg-[#132d28] text-green-400 border-[#0b4a2d]';
	}

	return 'bg-[#1e1e1e] text-neutral-300 border-[#333333]';
}

// * Track pill stack manually since TransitionGroup seems to be unable to animate sibling elements.
// * This sucks but whatever
// TODO - Replace this manual tracking with TransitionGroup? Am I wrong about it?

const pillRefs = ref<Record<string | number, HTMLElement>>({});
const pillHeights = ref<Record<string | number, number>>({});
const PILL_GAP_PIXELS = 8;
const PILL_DEFAULT_HEIGHT_PIXELS = 36;

function onPillMounted(element: HTMLElement, id: string | number) {
	const ro = new ResizeObserver(() => {
		pillHeights.value[id] = element.offsetHeight;
	});

	ro.observe(element);

	pillRefs.value[id] = element;
	pillHeights.value[id] = element.offsetHeight;
}

function getPillHeight(id: number): number {
	return pillHeights.value[id] ?? PILL_DEFAULT_HEIGHT_PIXELS;
}

function getTopOffset(index: number): number {
	let top = 0;

	for (let i = index - 1; i >= 0; i--) {
		const id = notifications.value[i].id;
		top += getPillHeight(id) + PILL_GAP_PIXELS;
	}

	return top;
}

function totalHeight(): number {
	if (!notifications.value.length) {
		return 0;
	}

	return getTopOffset(notifications.value.length - 1) + getPillHeight(notifications.value[notifications.value.length - 1].id);
}
</script>

<template>
	<Teleport to="body">
		<div class="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none" :style="{ height: totalHeight() + 'px', width: 'max-content', maxWidth: '90vw' }">
			<div v-for="(notification, i) in notifications" :key="notification.id" :ref="(element) => element && onPillMounted(element as HTMLElement, notification.id)" class="absolute left-1/2 -translate-x-1/2 pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border shadow-lg whitespace-nowrap overflow-hidden text-ellipsis transition-[top,opacity] duration-300" :class="[getTypeColor(notification.type), notification.leaving ? 'opacity-0 pointer-events-none' : 'opacity-100']" :style="{ top: getTopOffset(i) + 'px' }" @click="dismiss(notification.id)">
				<span class="flex-1">{{ notification.message }}</span>
				<button class="bg-transparent border-0 cursor-pointer text-inherit opacity-50 hover:opacity-100 text-xs pl-1 leading-none shrink-0 transition-opacity duration-150" @click.stop="dismiss(notification.id)"><X class="h-4 w-4" /></button>
			</div>
		</div>
	</Teleport>
</template>
