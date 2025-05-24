import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthLoading: true,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthLoading = false;
        },
    },
});

export const {login, logout} = userSlice.actions;

// SELECTORS
export const selectUser = (state) => state.user.user;
export const selectIsAuthLoading = (state) => state.user.isAuthLoading;

export default userSlice.reducer;