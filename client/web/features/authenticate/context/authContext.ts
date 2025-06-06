import { create } from 'zustand';

interface AuthContextType {
	isLoggedIn: boolean;
	shouldRefreshToken: boolean;
	loggedIn: () => void;
	loggedOut: () => void;
	refreshToken: () => void;
	cleanRefreshToken: () => void;
}

const useAuthContext = create<AuthContextType>((set) => ({
	isLoggedIn: false,
	shouldRefreshToken: false,
	loggedIn: () => set({ isLoggedIn: true }),
	loggedOut: () => set({ isLoggedIn: false }),
	refreshToken: () => set({ shouldRefreshToken: true }),
	cleanRefreshToken: () => set({ shouldRefreshToken: false }),
}));

export default useAuthContext;
