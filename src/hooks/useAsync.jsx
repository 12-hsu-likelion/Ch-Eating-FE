import axios from "axios";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// 로그인 하는 함수 1 => 해결
// 아이디 중복 확인하는 함수 1
// 아이디가 있는지 확인하는 함수 1
// 재설정된 비밀번호를 보내는 함수 1
// 회원가입 보내는 함수 1
// 전화번호로 인증코드 날리는 함수 3 => 해결
// 인증번호 입력 함수 3 => 해결

// 밑의 currentApi는 나중에 반드시 바꿔야함
export const currentApi = axios.create({
    baseURL: "http://localhost:8123",
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,
});

currentApi.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
        case "ISLOGIN":
            return {
                isLogin: action.ox
            }
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
            if (error.response.status === 401) {
                setInputTestMsg(prev => ({
                    ...prev,
                    phoneNumberMsg: "가입되지 않은 전화번호입니다"
                }))
            }
            else {
                setInputTestMsg(prev => ({
                    ...prev,
                    phoneNumberMsg: "오류가 발생했습니다"
                }))
            }

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
export const useVerifyAuthCodeAsync = (phoneNumber, code, setErrors, setInputTestMsg, deps = [], skip = true) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({
            type: "LOADING"
        })
        try {
            const response = await currentApi.post("/verify", {
                code,
                phoneNumber
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
            // 상태 코드 고칠 것
            if (error.response.status === 400) {
                setInputTestMsg(prev => ({
                    ...prev,
                    codeMsg: "인증번호가 올바르지 않습니다"
                }));
            }
            else {
                setInputTestMsg(prev => ({
                    ...prev,
                    codeMsg: "에러가 발생했습니다"
                }));
            }

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
}

// 로그인 하는 함수
export const useLoginAsync = (id, password, setError, setMessage) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const fetchData = async () => {

        dispatch({
            type: "LOADING"
        })
        try {
            const response = await currentApi.post("/login", {
                id,
                password
            });

            dispatch({
                type: "SUCCESS",
                data: response.data
            });

            setError(false);

            // 여기도 바꿔야함
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userInfo", JSON.stringify(response.data.others));

            navigate("/shouldbedeleted");
        } catch (error) {

            dispatch({
                type: "ERROR",
                error
            })

            setMessage(error.response.data.message);

            setError(true);
        }
    }

    return [state, fetchData];
}

// 로그인이 필요한 페이지의 상위 컴포넌트가 렌더링 되면 실행될 함수
export const useAxios = () => {
    const [state, dispatch] = useReducer(reducer, {
        isLogin: undefined
    });
    const fetch = async () => {
        try {
            const response = await currentApi.get("/isLogin");

            if (response.status === 210) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }

            console.log(response);

            dispatch({
                type: "ISLOGIN",
                ox: true
            })
        } catch (e) {
            alert("로그인이 필요한 서비스입니다.");
            console.log(e);
            dispatch({
                type: "ISLOGIN",
                ox: false
            })
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return [state, fetch];
}

// 월이 바뀔 때마다 월에 대한 정보를 요청하는 함수
// 이건 !!!!!!CalendarDaysWrapper!!!!!에서 사용함
export const useGetMonthData = (monthInfo) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function fetchData() {
        dispatch({
            type: "LOADING"
        });

        try{
            // const response = currentApi.get(`/api/ch-eating/calendar/calendar-details-monthly`, {
            //     params: {
            //         month: monthInfo
            //     }
            // });
            const response = await currentApi.get("/getmonthdata", {
                params: {
                    month: monthInfo
                }
            });

            dispatch({
                type: "SUCCESS",
                data: response.data
            })
        }catch(error){
            console.log(error);
            dispatch({
                type: "ERROR",
                error
            })
        }
    }

    return [state, fetchData];
}