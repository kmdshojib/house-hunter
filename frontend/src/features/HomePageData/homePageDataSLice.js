import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeData: null,
    error: null,
    isLoading: false,
    currentPage: 1
}
const homePageDataSLice = createSlice({
    name: "homepage",
    initialState,
    reducers: {
        homePageStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        homePageSuccess(state, action) {
            state.homeData = action.payload;
            state.isLoading = false;
        },
        homePageFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const {
    homePageStart,
    homePageSuccess,
    homePageFailure,
    setCurrentPage
} = homePageDataSLice.actions;

export default homePageDataSLice.reducer;