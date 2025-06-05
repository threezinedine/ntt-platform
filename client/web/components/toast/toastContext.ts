import { create } from 'zustand';
import { ToastMessage } from './props';

interface ToastContextType {
	messages: ToastMessage[];
	addToast: (message: ToastMessage) => void;
	removeToast: (message: ToastMessage) => void;
}

const useToastContext = create<ToastContextType>((set) => ({
	messages: [],
	addToast: (message: ToastMessage) => {
		set((state) => {
			const existingMessage = state.messages.find(
				(m) => m.message === message.message && m.type === message.type,
			);

			if (existingMessage) {
				return { messages: state.messages };
			}

			return {
				messages: [...state.messages, message],
			};
		});

		if (message.duration) {
			setTimeout(() => {
				set((state) => ({
					messages: state.messages.filter(
						(t) =>
							t.message !== message.message ||
							t.type !== message.type,
					),
				}));
			}, message.duration);
		}
	},
	removeToast: (message: ToastMessage) => {
		set((state) => ({
			messages: state.messages.filter(
				(m) => m.message !== message.message || m.type !== message.type,
			),
		}));
	},
}));

export default useToastContext;
