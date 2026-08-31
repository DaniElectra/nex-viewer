import { ref } from 'vue';

export type NotificationType = 'success';

type NotificationSettings = {
	type?: NotificationType;
	duration?: number;
};

type Notification = {
	id: number;
	message: string;
	type: NotificationType;
	leaving: boolean;
};

const notifications = ref<Notification[]>([]);
let notificationIDCounter = 0;

export function useNotifications(): {
	notifications: typeof notifications;
	notify: (message: string, settings?: NotificationSettings) => void;
	dismiss: (id: number) => void;
} {
	function notify(message: string, settings?: NotificationSettings): void {
		if (!settings) {
			settings = {};
		}

		if (!settings.type) {
			settings.type = 'success';
		}

		if (!settings.duration) {
			settings.duration = 3500;
		}

		const id = notificationIDCounter++;

		notifications.value.unshift({
			id: id,
			message: message,
			type: settings.type,
			leaving: false
		});

		setTimeout(() => dismiss(id), settings.duration);
	}

	function dismiss(id: number): void {
		const notification = notifications.value.find(n => n.id === id);
		if (!notification) {
			return;
		}

		notification.leaving = true;

		setTimeout(() => {
			notifications.value = notifications.value.filter(n => n.id !== id);
		}, 500);
	}

	return {
		notifications,
		notify,
		dismiss
	};
}
