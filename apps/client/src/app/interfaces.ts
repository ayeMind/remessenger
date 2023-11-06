export interface User{
    user_id: number;
    user_name: string;
}

export interface ChatListItem{
    id: number;
    name: string;
}

export interface ChatStore {
    user: User;
    chooseUser: (user: User) => void;
}

  