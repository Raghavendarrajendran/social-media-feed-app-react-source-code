import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { mockUsers } from '../../data/mockData';

interface UsersState {
  items: Record<string, User>;
}

const initialState: UsersState = {
  items: mockUsers.reduce<Record<string, User>>((acc, u) => {
    acc[u.id] = u;
    return acc;
  }, {}),
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: { payload: User }) {
      state.items[action.payload.id] = action.payload;
    },
    setUsers(state, action: { payload: User[] }) {
      state.items = action.payload.reduce<Record<string, User>>((acc, u) => {
        acc[u.id] = u;
        return acc;
      }, {});
    },
  },
});

export const { addUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export function selectUserByUsername(
  state: { users: UsersState },
  username: string
): User | undefined {
  return Object.values(state.users.items).find((u) => u.username === username);
}

export function selectAllUsernames(state: { users: UsersState }): string[] {
  return Object.values(state.users.items).map((u) => u.username);
}
