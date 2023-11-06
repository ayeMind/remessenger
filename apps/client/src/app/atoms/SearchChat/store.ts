import { create } from 'zustand';
import { User, SearchFilter, ChatListItem } from '../../interfaces';

const userList = [
  { id: 1, name: 'Roy Buchanan' },
  { id: 2, name: 'Nathan Carroll' },
  { id: 3, name: 'Janie Gregory' },
  { id: 4, name: 'Roy McCoy' },
  { id: 5, name: 'Jordan Williams' },
  { id: 6, name: 'Lucile Carter' },
  { id: 7, name: 'Hilda Wong' },
  { id: 8, name: 'Bettie Marshall' },
  { id: 9, name: 'Bertha Blair' },
  { id: 10, name: 'Lottie Garrett' },
  { id: 11, name: 'Donald Cunningham' },
  { id: 12, name: 'Christopher Ortega' },
  { id: 13, name: 'Ola Barker' },
  { id: 14, name: 'Albert Chandler' },
  { id: 15, name: 'Marc Watts' },
  { id: 16, name: 'Jeremiah Hill' },
];

export const useSearchFilter = create<SearchFilter>((set) => ({
  filtered: userList,
  filter: (search) =>
    set(() => {
      const filter = userList.filter((user: ChatListItem) => {
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
