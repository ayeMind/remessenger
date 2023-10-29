import {create} from "zustand"
import { User, ChatStore } from '../../interfaces'


export const useChat = create<ChatStore>(set => ({
    user: {
        user_id: 0,
        user_name: "Unknown",
    },
    chooseUser: (user: User) => set(() => {
        const selectedUser = {user_id: user.user_id, user_name: user.user_name}
        return {user: selectedUser};
    })
}))