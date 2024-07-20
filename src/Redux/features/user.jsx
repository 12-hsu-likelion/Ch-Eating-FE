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

// 로그인 하는 함수 1
// 아이디 중복 확인하는 함수 1
// 전화번호로 인증코드 날리는 함수 3
// 인증번호 입력 함수 3
// 아이디가 있는지 확인하는 함수 1
