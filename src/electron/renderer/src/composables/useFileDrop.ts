import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

export function useFileDrop(onFiles: (paths: string[]) => void): { isDragging: Ref<boolean, boolean> } {
	const isDragging = ref(false);
	let dragCounter = 0; // * Handles dragging anywhere on the screen

	function onDragEnter(event: DragEvent): void {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'copy';
		}

		dragCounter++;
		isDragging.value = true;
	}

	function onDragOver(event: DragEvent): void {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'copy';
		}
	}

	function onDragLeave(event: DragEvent): void {
		event.preventDefault();
		dragCounter--;

		if (dragCounter === 0) {
			isDragging.value = false;
		}
	}

	function onDrop(event: DragEvent): void {
		event.preventDefault();
		dragCounter = 0;
		isDragging.value = false;

		const files = event.dataTransfer?.files;

		if (!files?.length) {
			return;
		}

		const paths = Array.from(files).map(file => window.api.getPathForFile(file)).filter(file => !!file);

		if (paths.length > 0) {
			onFiles(paths);
		}
	}

	onMounted(() => {
		window.addEventListener('dragenter', onDragEnter);
		window.addEventListener('dragover', onDragOver);
		window.addEventListener('dragleave', onDragLeave);
		window.addEventListener('drop', onDrop);
	});

	onUnmounted(() => {
		window.removeEventListener('dragenter', onDragEnter);
		window.removeEventListener('dragover', onDragOver);
		window.removeEventListener('dragleave', onDragLeave);
		window.removeEventListener('drop', onDrop);
	});

	return {
		isDragging
	};
}
