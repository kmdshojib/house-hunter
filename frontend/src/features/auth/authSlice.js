import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
