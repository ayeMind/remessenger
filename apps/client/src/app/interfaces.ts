export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ChatStore {
  user: User;
  chooseUser: (user: User) => void;
}

export interface SearchFilter {
  filtered: User[];
  filter: (search: string) => void;
  search: string;
  setSearch: (search: string) => void;
}
