import { create } from 'zustand';
import { User, ChatStore } from '../../interfaces';

export const useChat = create<ChatStore>((set) => ({
  user: {
    id: 0,
    name: 'Unknown',
    email: 'Unknown',
  },
  chooseUser: (user: User) =>
    set(() => {
      const selectedUser = { id: user.id, name: user.name, email: user.email };
      return { user: selectedUser };
    }),
}));
