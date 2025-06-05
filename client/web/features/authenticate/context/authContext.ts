import { create } from 'zustand';

interface AuthContextType {
	isLoggedIn: boolean;
	loggedIn: () => void;
	loggedOut: () => void;
}

const useAuthContext = create<AuthContextType>((set) => ({
	isLoggedIn: false,
	loggedIn: () => set({ isLoggedIn: true }),
	loggedOut: () => set({ isLoggedIn: false }),
}));

export default useAuthContext;
