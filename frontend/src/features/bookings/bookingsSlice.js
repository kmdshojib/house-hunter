import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getBookingsById: [],
    error: null,
    isLoading: false,
}
const getBookingsByIdSlice = createSlice({
    name: "getBookingsById",
    initialState,
    reducers: {
        getBookingsByStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getBookingsBySuccess(state, action) {
            state.getBookingsById = action.payload;
            state.isLoading = false;
        },
        getBookingsByFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    getBookingsByStart,
    getBookingsBySuccess,
    getBookingsByFailure,
} = getBookingsByIdSlice.actions;

export default getBookingsByIdSlice.reducer;