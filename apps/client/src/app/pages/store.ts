import { create } from 'zustand';
import { LoginStore } from '../interfaces';

export const useLogin = create<LoginStore>((set) => ({
  isLogged: false,
  user: null,
  login: () => set(() => ({ isLogged: true })),
  logout: () => set(() => ({ isLogged: false })),
  setUser: (user) => set(() => ({ user })),
}));
