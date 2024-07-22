import styled from "styled-components";
import colors from "../../styles/colors";
import { useInput } from "../../hooks/useInput";
import { inputRegexs } from "../../components/LoginAndSignUp/inputRegexs";
import Msg from "../../components/LoginAndSignUp/InputMessage";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRequestAuthCodeAsync, useVerifyAuthCodeAsync } from "../../hooks/useAsync";

const SignUp = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [matchPw, handleMatch, setMatch] = useInput("");

    const [name, handleName, setName] = useInput("");
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [currentSection, setCurrentSection] = useState("login-info");

    const [inputTestMsg, setInputTestMsg] = useState({
        idMsg: "",
        pwMsg: "",
        matchMsg: "",
        codeMsg: ""
    });

    const [errors, setErrors] = useState({
        idError: {
            formatError: false,
            dupError: true
        },
        pwError: false,
        matchError: false,
        verificationCodeError: true
    });

    const inputCodeRef = useRef();
    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState({
        idFocus: false,
        pwdFocus: false,
        matchPwdFocus: false,
        nameFocus: false,
        phoneNumberFocus: false,
        codeFocus: false,
    })

    useEffect(() => {
        if (!inputRegexs.idReg.test(id)) {
            setErrors(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: true
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "아이디는 6~12글자이어야 합니다"
            });
        } else {
            setErrors(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: false
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "형식에 맞는 아이디입니다! 중복을 검사해주세요"
            });
        }
    }, [id]);

    useEffect(() => {
        if (!inputRegexs.pwReg.test(pw)) {
            setErrors({
                ...errors,
                pwError: true
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "비밀번호는 최소 하나의 특수문자를 포함하여 8~15글자이어야 합니다"
            });
        } else {
            setErrors({
                ...errors,
                pwError: false
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "사용 가능한 비밀번호입니다"
            });
        }
    }, [pw]);

    useEffect(() => {
        if (matchPw !== pw) {
            setErrors(prev => ({
                ...prev,
                matchError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 일치하지 않습니다"
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                matchError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 일치합니다"
            }));
        }
    }, [pw, matchPw]);

    // 비동기 함수들

    // 다음 버튼 클릭했을 시 정보 입력 폼 변경 / 모든 폼을 입력했을 시 회원가입 정보 제출이 되도록하는 함수
    // 나중에 async 함수로 바꿀 것
    const onSubmit = async () => {
        if (currentSection === "login-info") {
            setCurrentSection("user-info");
            gsap.to(".slider", {
                x: "-100%",
                duration: .5,
                ease: "power3.out"
            })
        }
        else {
            try {
                console.log({
                    id: id,
                    pw: pw,
                    name: name,
                    phoneNumber: phoneNumber
                })
                navigate("/signupcomplete");
            } catch (e) {
                console.log(e);
            }
        }
    }

    // 아이디 중복 확인하는 함수 
    // 현재는 그냥 중복 확인을 누를 시 dupError가 false가 되도록 설정해놓음
    // 나중에 async 함수로 바꿀 것
    const checkIdDup = () => {
        if (errors.idError.formatError) {
            alert("올바른 아이디 형식을 입력 후 중복 확인을 해주세요");
            return;
        }

        setErrors(prev => ({
            ...prev,
            idError: {
                ...prev.idError,
                dupError: false
            }
        }));
        setInputTestMsg((prev) => ({
            ...prev,
            idMsg: "사용 가능한 아이디입니다"
        }))
    }

    const [requsetAuthCodeState, requestAuthCodeByPhoneNumber] = useRequestAuthCodeAsync(phoneNumber, inputCodeRef, setErrors, setInputTestMsg);
    const [verifyAuthCodeState, verifyAuthCode] = useVerifyAuthCodeAsync(code, setErrors, setInputTestMsg);

    useEffect(() => {
        if (code.length === 6) {
            verifyAuthCode();
        }
    }, [code])
    
    // 이건 에러 코드가 변경됐을 시 에러 코드 상태 보여주는 것 나중에 지우셈
    // useEffect(() => {
    //     console.log(errors);
    // }, [errors]);

    return (
        <StyledSignUp className="pageContainer">
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
                                <Title $isFocused={isFocused} $target="idFocus">아이디</Title>
                                <input
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={handleId}
                                    placeholder="*(필수) 6~12자 이내, 영문, 숫자 사용가능"
                                    required
                                    maxLength={12}
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: true,
                                            pwdFocus: false,
                                            matchPwdFocus: false,
                                            nameFocus: false,
                                            phoneNumberFocus: false,
                                            codeFocus: false,
                                        })
                                    }}
                                />
                                {id !== "" && (
                                    <Msg error={errors.idError.formatError} text={inputTestMsg.idMsg} />
                                )}
                                <button onClick={checkIdDup} disabled={id.length === 0 ? true : false}>
                                    중복확인
                                </button>
                            </div>

                            <div className="input pw-input">
                                <Title $isFocused={isFocused} $target="pwdFocus">비밀번호</Title>
                                <input
                                    type="text"
                                    value={pw}
                                    onChange={handlePw}
                                    placeholder="*(필수) 8자 이상, 영문, 숫자, 특수문자 필수"
                                    required
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: false,
                                            pwdFocus: true,
                                            matchPwdFocus: false,
                                            nameFocus: false,
                                            phoneNumberFocus: false,
                                            codeFocus: false,
                                        })
                                    }}
                                />
                                {pw !== "" && (
                                    <Msg error={errors.pwError} text={inputTestMsg.pwMsg} />
                                )}
                            </div>

                            <div className="input check-input">
                                <Title $isFocused={isFocused} $target="matchPwdFocus">비밀번호 확인</Title>
                                <input
                                    type="text"
                                    value={matchPw}
                                    onChange={handleMatch}
                                    required
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: false,
                                            pwdFocus: false,
                                            matchPwdFocus: true,
                                            nameFocus: false,
                                            phoneNumberFocus: false,
                                            codeFocus: false,
                                        })
                                    }}
                                />
                                {matchPw !== "" && (
                                    <Msg error={errors.matchError} text={inputTestMsg.matchMsg} />
                                )}
                            </div>
                        </div>

                        <div className="user-info">
                            <div className="input name-input">
                                <Title $isFocused={isFocused} $target="nameFocus">이름</Title>

                                <input
                                    type="text"
                                    placeholder="*(필수)이름을 입력해주세요"
                                    required
                                    value={name}
                                    onChange={handleName}
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: false,
                                            pwdFocus: false,
                                            matchPwdFocus: false,
                                            nameFocus: true,
                                            phoneNumberFocus: false,
                                            codeFocus: false,
                                        })
                                    }}
                                />
                            </div>

                            <div className="input phone-number-input">
                                <Title $isFocused={isFocused} $target="phoneNumberFocus">전화번호</Title>

                                <input
                                    type="text"
                                    placeholder="*(필수)전화번호를 입력해주세요."
                                    required
                                    value={phoneNumber}
                                    onChange={handlePhoneNumber}
                                    name="phone-number"
                                    maxLength={13}
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: false,
                                            pwdFocus: false,
                                            matchPwdFocus: false,
                                            nameFocus: false,
                                            phoneNumberFocus: true,
                                            codeFocus: false,
                                        })
                                    }}
                                />
                                <button onClick={requestAuthCodeByPhoneNumber} disabled={phoneNumber.length === 13 ? false : true}>인증받기</button>
                            </div>

                            <div className="input verification-code-input">
                                <Title $isFocused={isFocused} $target="codeFocus">인증번호 입력</Title>

                                <input
                                    type="text"
                                    placeholder="인증번호를 입력해주세요."
                                    required
                                    value={code}
                                    onChange={handleCode}
                                    ref={inputCodeRef}
                                    maxLength={6}
                                    onFocus={() => {
                                        setIsFocused({
                                            idFocus: false,
                                            pwdFocus: false,
                                            matchPwdFocus: false,
                                            nameFocus: false,
                                            phoneNumberFocus: false,
                                            codeFocus: true,
                                        })
                                    }}
                                />
                                {code !== "" && (
                                    <Msg error={errors.verificationCodeError} text={inputTestMsg.codeMsg} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onSubmit}
                    className="next"
                    disabled={
                        currentSection === "login-info" &&
                        (errors.idError.formatError ||
                            errors.idError.dupError ||
                            errors.pwError ||
                            errors.matchError) ||
                        currentSection === "user-info" && (
                            name === "" ||
                            phoneNumber === "" ||
                            errors.verificationCodeError
                        )
                    }
                >
                    다음
                </button>
            </div>
        </StyledSignUp>
    );
};

const StyledSignUp = styled.section`
  height: 100vh;
  //마진 상쇄 방지 border
  border: .000000000001px solid transparent;

  .signUp-content {
    margin: 230px 16px 0 16px;

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

            input {
              width: 100%;
              margin-left: -2.2px;
              color: ${colors.black};
              font-size: 12px;
              padding-bottom: 3px;
              border-bottom: 1px solid ${colors.gray3};

              &:focus{
                border-bottom: 1px solid ${colors.mainColor};
              }
            }

            input[name="id"],
            input[name="phone-number"] {
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
              width: 64px;
              height: 37px;
            }
            
            button:disabled{
             background-color: ${colors.gray2};
             color: #9FA4A8;
             pointer-events: none;
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

const Title = styled.p`
    font-size: 14px;
    color: ${({ $target, $isFocused }) => $isFocused[$target] ? colors.mainColor : colors.gray5};
    margin-bottom: 8px;
    font-weight: 600;
`;

export default SignUp;
