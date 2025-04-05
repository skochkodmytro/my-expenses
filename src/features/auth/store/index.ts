import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface UserStore {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  reset: () => void;
}

const initialStore = {
  user: null,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialStore,
  setUser: (user) => set({ user }),
  reset: () => set(initialStore),
}));
