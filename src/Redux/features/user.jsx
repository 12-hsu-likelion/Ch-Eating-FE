import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUserId: null,
    isLoading: true,
    error: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        test(state, action) {
            state.currentUserId = "테스트 유저1";
        }
    },
    // extraReducers: (builder) => {
    //     // async함수들
    // }
})

export const { test } = userSlice.actions;