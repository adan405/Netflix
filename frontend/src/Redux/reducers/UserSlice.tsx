import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn: boolean;
    token: string | null;
}
const initialState: UserState = {
    isLoggedIn: false,
    token: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;