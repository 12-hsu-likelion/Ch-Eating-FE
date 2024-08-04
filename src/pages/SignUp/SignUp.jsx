import styled from "styled-components";
import colors from "../../styles/colors";
import { useInput } from "../../hooks/useInput";
import { inputRegexs } from "../../components/LoginAndSignUp/inputRegexs";
import Msg from "../../components/LoginAndSignUp/InputMessage";
import { useEffect, useState } from "react";
import { useCheckIdDup, useOnSignUp } from "../../hooks/useAsync";

const SignUp = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [matchPw, handleMatch, setMatch] = useInput("");
    const [name, handleName, setName] = useInput("");

    const [inputTestMsg, setInputTestMsg] = useState({
        nameMsg: "",
        idMsg: "",
        pwMsg: "",
        matchMsg: "",
    });

    const [errors, setErrors] = useState({
        nameError: true,
        idError: {
            formatError: false,
            dupError: true
        },
        pwError: false,
        matchError: false,
    });

    const [isFocused, setIsFocused] = useState({
        idFocus: false,
        pwdFocus: false,
        matchPwdFocus: false,
        nameFocus: false,
    });

    useEffect(()=>{
        if(!inputRegexs.nameReg.test(name)){
            setErrors(prev=>({
                ...prev,
                nameError: true,
            }))

            setInputTestMsg(prev=>({
                ...prev,
                nameMsg: "이름은 영문자 및 숫자, 유효한 한글 포함 3~15글자이어야 합니다"
            }))
        }
        else{
            setErrors(prev=>({
                ...prev,
                nameError: false,
            }))

            setInputTestMsg(prev=>({
                ...prev,
                nameMsg: ""
            }))
        }
    }, [name]);

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

    // 통신 함수
    const [idDupState, checkIdDup] = useCheckIdDup(id, errors, setErrors, setInputTestMsg);
    const [signUpState, onSignUp] = useOnSignUp(name, id, pw);

    return (
        <StyledSignUp className="pageContainer">
            <div className="signUp-content">
                <header>
                    <p>회원가입</p>
                    <h2>회원가입 정보를 입력해주세요.</h2>
                </header>

                <div className="input-wrapper">
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
                                });
                            }}
                        />

                        {name !== "" && (
                            <Msg error={errors.nameError} text={inputTestMsg.nameMsg} />
                        )}
                    </div>
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
                                });
                            }}
                        />
                        {id !== "" && (
                            <Msg error={errors.idError.formatError} text={inputTestMsg.idMsg} />
                        )}
                        <button onClick={checkIdDup} disabled={id.length < 6 ? true : false}>
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
                                });
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
                                });
                            }}
                        />
                        {matchPw !== "" && (
                            <Msg error={errors.matchError} text={inputTestMsg.matchMsg} />
                        )}
                    </div>
                </div>

                <button
                    onClick={onSignUp}
                    className="next"
                    disabled={
                        errors.nameError ||
                        errors.idError.formatError ||
                        errors.idError.dupError ||
                        errors.pwError ||
                        errors.matchError
                    }
                >
                    확인
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
            margin-bottom: 65px;

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

                    &:focus {
                        border-bottom: 1px solid ${colors.mainColor};
                    }
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

                button:disabled {
                    background-color: ${colors.gray2};
                    color: #9FA4A8;
                    pointer-events: none;
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
            margin-top: 92px;
            margin-bottom: 80px;
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
