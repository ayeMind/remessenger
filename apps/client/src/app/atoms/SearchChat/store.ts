import { create } from 'zustand';
import { User, SearchFilter } from '../../interfaces';

export const useSearchFilter = create<SearchFilter>((set) => ({
  filtered: [],
  filter: (userList, search) =>
    set(() => {
      const filter = userList.filter((user: User) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      });
      return { filtered: filter };
    }),

  search: '',
  setSearch: (search) =>
    set(() => {
      return { search: search };
    }),
}));
