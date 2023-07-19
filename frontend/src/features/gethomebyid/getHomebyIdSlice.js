import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getDataById: null,
    error: null,
    isLoading: false,
}
const getHomeByIdSlice = createSlice({
    name: "homeById",
    initialState,
    reducers: {
        getHomeByIdStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getHomeByIdSuccess(state, action) {
            state.getDataById = action.payload;
            state.isLoading = false;
        },
        getHomeByIdFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    getHomeByIdStart,
    getHomeByIdSuccess,
    getHomeByIdFailure,
} = getHomeByIdSlice.actions;

export default getHomeByIdSlice.reducer;