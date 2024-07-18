import styled from "styled-components";
import colors from "../styles/colors";
import { useInput } from "../hooks/useInput";
import { useEffect, useState } from "react";
import gsap from "gsap";

const SignUp = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [matchPw, handleMatch, setMatch] = useInput("");

    const [name, handleName, setName] = useInput("");
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("");
    const [code, handleCode, setCode] = useInput("");

    const [currentSection, setCurrentSection] = useState("login-info");

    const [inputTestMsg, setInputTestMsg] = useState({
        idMsg: "",
        pwMsg: "",
        matchMsg: ""
    });

    const [error, setError] = useState({
        idError: {
            formatError: false,
            dupError: true
        },
        pwError: false,
        matchError: false
    });

    const inputRegexs = {
        // 대소문자 및 숫자, 하이픈, 언더스코어 포함 6~12글자
        idReg: /^[a-zA-Z0-9-_]{6,12}$/,
        // 최소 하나의 소문자, 숫자, 특수문자 8~24글자
        pwReg: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    };

    useEffect(() => {
        if (!inputRegexs.idReg.test(id)) {
            setError(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: true
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "아이디는 6~12글자이어야 합니다."
            });
        } else {
            setError(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: false
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "형식에 맞는 아이디입니다! 중복을 검사해주세요."
            });
        }
    }, [id]);

    useEffect(() => {
        if (!inputRegexs.pwReg.test(pw)) {
            setError({
                ...error,
                pwError: true
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "비밀번호는 최소 하나의 대소문자를 포함하여 8~24글자이어야 합니다."
            });
        } else {
            setError({
                ...error,
                pwError: false
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "사용 가능한 비밀번호입니다."
            });
        }
    }, [pw]);

    useEffect(() => {
        if (matchPw !== pw) {
            setError(prev => ({
                ...prev,
                matchError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 맞지 않습니다."
            }));
        } else {
            setError(prev => ({
                ...prev,
                matchError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 일치합니다."
            }));
        }
    }, [pw, matchPw]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <SignUpWrapper className="pageContainer">
            <div className="signUp-content">
                <header>
                    <p>회원가입</p>
                    {currentSection === "login-info" ? (
                        <h2>로그인 정보를 입력해주세요.</h2>
                    ) : (
                        <h2>개인정보를 입력해주세요.</h2>
                    )}
                </header>

                <div className="input-wrapper">
                    <div className="slider">
                        <div className="login-info">
                            <div className="input id-input">
                                <p>아이디</p>
                                <input
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={handleId}
                                    placeholder="*(필수) 6~12자 이내, 영문, 숫자 사용가능"
                                    required
                                />
                                {id !== "" && (
                                    <Msg $error={error.idError.formatError}>
                                        {inputTestMsg.idMsg}
                                    </Msg>
                                )}
                                <button onClick={() => {
                                    setError(prev => ({
                                        ...prev,
                                        idError: {
                                            ...prev.idError,
                                            dupError: false
                                        }
                                    }));
                                }}>
                                    중복확인
                                </button>
                            </div>

                            <div className="input pw-input">
                                <p>비밀번호</p>
                                <input
                                    type="text"
                                    value={pw}
                                    onChange={handlePw}
                                    placeholder="*(필수) 8자 이상, 영문, 숫자, 특수문자 필수"
                                    required
                                />
                                {pw !== "" && (
                                    <Msg $error={error.pwError}>
                                        {inputTestMsg.pwMsg}
                                    </Msg>
                                )}
                            </div>

                            <div className="input check-input">
                                <p>비밀번호 확인</p>
                                <input
                                    type="text"
                                    value={matchPw}
                                    onChange={handleMatch}
                                    required
                                />
                                {matchPw !== "" && (
                                    <Msg $error={error.matchError}>
                                        {inputTestMsg.matchMsg}
                                    </Msg>
                                )}
                            </div>
                        </div>

                        <div className="user-info">
                            <div className="input name-input">
                                <p>이름</p>
                                <input
                                    type="text"
                                    placeholder="*(필수)이름을 입력해주세요"
                                    required
                                    value={name}
                                    onChange={handleName}
                                />
                            </div>

                            <div className="input phone-number-input">
                                <p>전화번호</p>
                                <input
                                    type="text"
                                    placeholder="*(필수)전화번호를 입력해주세요."
                                    required
                                    value={phoneNumber}
                                    onChange={handlePhoneNumber}
                                />
                                {/* {id !== "" && (
                                    <Msg $error={error.idError.formatError}>
                                        {inputTestMsg.idMsg}
                                    </Msg>
                                )} */}
                                <button>인증받기</button>
                            </div>

                            <div className="input verification-code-input">
                                <p>인증번호 입력</p>
                                <input
                                    type="text"
                                    placeholder="인증번호를 입력해주세요."
                                    required
                                    value={code}
                                    onChange={handleCode}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if(currentSection === "login-info"){
                            setCurrentSection("user-info");
                            gsap.to(".slider", {
                                x: "-100%",
                                duration: .5,
                                ease: "power2.out"
                            })
                        }
                        else{
                            console.log("제출됨")
                        }
                    }}
                    className="next"
                    disabled={
                        currentSection === "login-info" &&
                        (error.idError.formatError ||
                            error.idError.dupError ||
                            error.pwError ||
                            error.matchError) ||
                            // 이 밑에는 고쳐야함
                        currentSection === "user-info" && (
                            name === "" ||
                            phoneNumber === "" ||
                            code === ""
                        )
                    }
                >
                    다음
                </button>
            </div>
        </SignUpWrapper>
    );
};

const SignUpWrapper = styled.section`
  height: 100vh;
  //마진 상쇄 방지 border
  border: .000000000001px solid transparent;

  .signUp-content {
    width: 92%;
    margin: 0 auto;
    margin-top: 230px;

    header {
      margin-bottom: 94px;

      > p {
        font-size: 18px;
        color: ${colors.gray6};
        margin-bottom: 7px;
      }

      h2 {
        font-size: 24px;
        font-weight: 700;
        color: ${colors.black};
      }
    }

    .input-wrapper {
      overflow-x: hidden;
      width: 100%;

      .slider {
        width: 100%;
        display: flex;
        /* transform: translateX(-100%); */
        
        .login-info {
          width: 100%;
          flex-shrink: 0;
        }

        .user-info{
            width: 100%;
            flex-shrink: 0;

            input{
                padding-left: 2.6px;
            }
        }
        
        .input {
            width: 100%;
            position: relative;
            margin-bottom: 30px;
            height: 49px;

            p {
              font-size: 14px;
              color: ${colors.gray5};
              margin-bottom: 8px;
              font-weight: 600;
            }

            input {
              width: 100%;
              margin-left: -2.9px;
              color: ${colors.black};
              font-size: 12px;
              margin-bottom: 4px;
              padding-bottom: 3px;
              border-bottom-width: 100% !important;
              border-bottom: 1px solid ${colors.gray3};

              &:focus{
                border-bottom: 1px solid ${colors.mainColor};
              }
            }

            input[name="id"] {
              padding-right: 80px;
            }

            input::placeholder {
              color: ${colors.gray3};
            }

            button {
              position: absolute;
              top: 0;
              right: 1px;
              background: ${colors.mainColor};
              color: ${colors.gray1};
              font-size: 10px;
              border-radius: 2px;
              padding: 11px 12px;
            }
          }
      }
    }

    .next {
      background-color: ${colors.mainColor};
      width: 100%;
      border-radius: 29px;
      font-size: 16px;
      color: ${colors.gray1};
      padding: 18px 0;
      margin-top: 130px;
    }

    .next:disabled {
      background-color: ${colors.gray2};
      color: #9FA4A8;
      pointer-events: none;
    }
  }
`;

const Msg = styled.div`
  font-size: 10px;
  color: ${({ $error }) => $error ? `${colors.error}` : "#0066FF"};
`;

export default SignUp;
