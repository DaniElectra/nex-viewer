import { ref } from 'vue';

const tooltip = ref<{
	x: number;
	y: number;
} | null>(null);
const tooltipKey = ref(0); // * Required to force the DOM to reload the tooltip, which enables spam-clicking. Juice
let startTime = Date.now();

export function useClipboard(): { tooltip: typeof tooltip; tooltipKey: typeof tooltipKey; copyToClipboard(e: MouseEvent, text: string): void } {
	function copyToClipboard(e: MouseEvent, text: string): void {
		window.api.copyToClipboard(text);

		const currentKey = ++tooltipKey.value;
		startTime = Date.now();
		tooltip.value = {
			x: e.clientX,
			y: e.clientY
		};

		// * We have to use requestAnimationFrame here because setTimeout won't work
		// * while the backend is still pumping thousands of packet events to the UI
		const check = (): void => {
			if (currentKey !== tooltipKey.value) {
				return;
			}

			if (Date.now() - startTime >= 500) {
				tooltip.value = null;
			} else {
				requestAnimationFrame(check);
			}
		};

		requestAnimationFrame(check);
	}

	return {
		tooltip,
		tooltipKey,
		copyToClipboard
	};
}
