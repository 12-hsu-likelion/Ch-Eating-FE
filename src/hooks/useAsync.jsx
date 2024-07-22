import axios from "axios";
import { useEffect, useReducer } from "react";

// 로그인 하는 함수 1
// 아이디 중복 확인하는 함수 1
// 아이디가 있는지 확인하는 함수 1
// 재설정된 비밀번호를 보내는 함수 1
// 회원가입 보내는 함수 1
// 전화번호로 인증코드 날리는 함수 3 => 해결
// 인증번호 입력 함수 3 => 해결

// 밑의 currentApi는 나중에 반드시 바꿔야함
const currentApi = axios.create({
    baseURL: "http://localhost:8123",
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,
});

const initialState = {
    loading: false,
    data: null,
    error: null
};

function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: false
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: false
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// 핸드폰 번호로 코드를 전송하라는 요청을 보내는 함수
export const useRequestAuthCodeAsync = (phoneNumber, ref, setErrors, setInputTestMsg, deps = [], skip = true) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({
            type: "LOADING"
        });

        try {
            const response = await currentApi.post("/makeauthcode", {
                phoneNumber
            })

            setErrors(prev => ({
                ...prev,
                phoneNumberError: false
            }));
            alert(`${phoneNumber}로 6자리 인증코드가 발송되었습니다!`);
            setTimeout(() => {
                if (ref.current) {
                    ref.current.focus();
                }
            }, 0);

            dispatch({
                type: "SUCCESS",
                data: response.data
            })
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                phoneNumberError: true
            }));
            // 전화번호가 없을 시 상태코드 받아와서 밑에 코드 실행
            setInputTestMsg(prev => ({
                ...prev,
                phoneNumberMsg: "가입되지 않은 전화번호입니다."
            }))

            dispatch({
                type: "ERROR",
                error
            })
        }
    }

    useEffect(() => {
        if (skip) return;

        fetchData();
    }, deps);

    return [state, fetchData];
};

// 인증 코드를 받아와서 인증 코드가 일치하는지 확인하는 함수
export const useVerifyAuthCodeAsync = (code, setErrors, setInputTestMsg, deps = [], skip = true) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({
            type: "LOADING"
        })
        try {
            const response = await currentApi.post("/verify", {
                code
            });

            setErrors(prev => ({
                ...prev,
                verificationCodeError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증되었습니다"
            }));

            dispatch({
                type: "SUCCESS",
                data: response.data
            })
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                verificationCodeError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증번호가 올바르지 않습니다"
            }));

            dispatch({
                type: "ERROR",
                error
            })
        }
    }

    useEffect(()=>{
        if(skip) return;

        fetchData();
    }, deps);

    return [state, fetchData];
}