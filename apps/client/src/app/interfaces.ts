export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Message {
  text: string;
  userId: number;
  chatId: number;
  createdAt: Date;
}

export interface ChatStore {
  selectedUser: User;
  chooseUser: (user: User) => void;
}

export interface SearchFilter {
  filtered: User[];
  filter: (userList: User[], search: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

export interface LoginStore {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
  setUser: (user: User) => void;
}
