import axios from "axios";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// 로그인 관련
// 1. 로그인 하는 함수
// 2. 아이디 중복 확인하는 함수
// 3. 회원가입 보내는 함수
// 4. islogin 관련 함수

// 캘린더 관련
// 5. 캘린더에 표시할 월에 대한 정보를 표시하는 함수
// 6. 캘린더 페이지의 하단에 데이터의 정보를 받아오는 함수

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

// 로그인 하는 함수
export const useLoginAsync = (id, password, setError, setMessage) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const fetchData = async () => {

        dispatch({
            type: "LOADING"
        })
        try {
            const response = await currentApi.post("/api/users/signIn", {
                userId: id,
                userPassword: password
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

// 아이디 중복 확인하는 함수
export const useCheckIdDup = (id, errors, setErrors, setInputTestMsg) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function checkIpDup() {
        if (errors.idError.formatError) {
            alert("올바른 아이디 형식을 입력 후 중복 확인을 해주세요");
            return;
        }

        dispatch({
            type: "LOADING"
        })

        try {
            const response = await currentApi.get("/api/users/checkUserIdExists", {
                params: {
                    userId: id
                }
            })

            console.log(response.data);
            if(response.data.data === "사용 가능한 아이디입니다."){
                setErrors(prev=>({
                    ...prev,
                    idError: {
                        ...prev.idError,
                        dupError: false
                    }
                }))

                setInputTestMsg(prev=>({
                    ...prev,
                    idMsg: response.data.data
                }))
            }else{
                setErrors(prev=>({
                    ...prev,
                    idError: {
                        ...prev.idError,
                        dupError: true
                    }
                }))

                setInputTestMsg(prev=>({
                    ...prev,
                    idMsg: response.data.data
                }))
            }

            dispatch({
                type: "SUCCESS",
                data: response.data
            });
        } catch (error) {
            dispatch({
                type: "ERROR",
                error
            })

            setErrors(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    dupError: true
                }
            }))

            setInputTestMsg(prev => ({
                ...prev,
                idMsg: "오류가 발생했습니다."
            }))
        }
    }

    return [state, checkIpDup];
};

// 회원가입하는 함수
export const useOnSignUp = (userId, userName, userPassword) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    async function onSignUp(){
        dispatch({
            type: "LOADING"
        })

        try{
            const response = await currentApi.post("/api/users/signUp", {
                userId,
                userName,
                userPassword,
                userRoles: ["ROLE_CLIENT"]
            });

            console.log(response.data);
            dispatch({
                type: "SUCCESS",
                data: response.data
            });

            navigate("/signupcomplete");

        }catch(error){
            dispatch({
                type: "ERROR",
                error
            })
        }
    }

    return [state, onSignUp];
}

// 로그인이 필요한 페이지의 상위 컴포넌트가 렌더링 되면 실행될 함수
export const useAxios = () => {
    const [state, dispatch] = useReducer(reducer, {
        isLogin: undefined
    });
    const fetch = async () => {
        try {
            const response = await currentApi.get("/api/users/isLogin");

            if (!!response.data.accessToken) {
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

        try {
            // const response = currentApi.get(`/api/ch-eating/calendar/calendar-details-monthly`, {
            //     params: {
            //         month: monthInfo
            //     }
            // });
            const response = await currentApi.get("/api/calendar/calendar-details-monthly", {
                params: {
                    month: monthInfo
                }
            });

            dispatch({
                type: "SUCCESS",
                data: response.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: "ERROR",
                error
            })
        }
    }

    return [state, fetchData];
}

// week를 새로 선택할 때마다 week의 가짜 배고픔 요일, 시간, 횟수를 가져오는 함수
// 이것과 바로 아래의 month는 HungerAnalytics에서 사용함
export const useGetWeeklyFakeHungerStats = (startDate, endDate, deps = []) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function getWeeklyFakeHungerStats(){
        dispatch({
            type: "LOADING"
        });

        try{
            const response = await currentApi.get("/api/fake-hunger-stats/weekly", {
                params: {
                    startDate,
                    endDate
                }
            })

            console.log(response.data);

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

    // useEffect(()=>{
    //     getWeeklyFakeHungerStats();
    // }, deps);

    return [state, getWeeklyFakeHungerStats];
}

// month를 새로 선택할 때마다 month의 가짜 배고픔 요일, 시간, 횟수를 가져오는 함수
export const useGetMonthlyFakeHungerStats = (year, month, deps = []) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function getMonthlyFakeHungerStats() {
        dispatch({
            type: "LOADING"
        });

        try{
            const response = await currentApi.get("/api/tests/byMonth", {
                params: {
                    year,
                    month
                }
            });

            console.log(response.data);

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
    };

    // useEffect(()=>{
    //     getMonthlyFakeHungerStats();
    // }, [deps]);
    
    return [state, getMonthlyFakeHungerStats];
}