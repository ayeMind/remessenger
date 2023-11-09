import { create } from 'zustand';
import { User, ChatStore } from '../interfaces';

export const useChat = create<ChatStore>((set) => ({
  selectedUser: {
    id: 0,
    name: 'Remessenger',
    email: '',
    password: '',
    avatar: '',
  },
  chooseUser: (user: User) =>
    set(() => {
      const selectedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      };
      return { selectedUser: selectedUser };
    }),
}));
