import { create } from 'zustand';
import { User, SearchFilter } from '../../interfaces';
import axios from 'axios';

const userList: User[] = [];

const getUserList = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/users');
    console.log(data);

    data.forEach((element) => {
      userList.push(element);
    });
  } catch (error) {
    console.log(error);
  }
};

getUserList();

export const useSearchFilter = create<SearchFilter>((set) => ({
  filtered: userList,
  filter: (search) =>
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
