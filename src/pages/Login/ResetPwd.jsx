import React, { useEffect, useRef, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Msg from '../../components/LoginAndSignUp/InputMessage';
import gsap from "gsap";
import { inputRegexs } from '../../components/LoginAndSignUp/inputRegexs';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useRequestAuthCodeAsync, useVerifyAuthCodeAsync } from '../../hooks/useAsync';
import sign_up_logo from "../../assets/images/sign_up_logo.png";

const ResetPwd = () => {
    const [id, handleId, setId] = useInput("");
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [newPwd, handleNewPwd, setNewPwd] = useInput("");
    const [matchNewPwd, handleMatchNewPwd, setMatchNewPwd] = useInput("");

    const [inputTestMsg, setInputTestMsg] = useState({
        checkIdMsg: "",
        phoneNumberMsg: "",
        codeMsg: "",
        newPwdMsg: "",
        matchNewPwdMsg: ""
    });

    const [errors, setErrors] = useState({
        checkIdError: true,
        phoneNumberError: true,
        verificationCodeError: true,
        newPwdError: true,
        matchNewPwdError: true
    });

    const [currentSection, setCurrentSection] = useState("before");

    const inputCodeRef = useRef();
    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState({
        idFocus: false,
        phoneNumberFocus: false,
        codeFocus: false,
        newPwdFocus: false,
        matchNewPwdFocus: false
    })

    // 아이디가 존재하는지 확인하는 post 요청에서 아이디 존재 유무와 해당 아이디의 비밀번호도 같이 받아와야함
    // 밑은 그 작업을 위한 변수 설정
    const [currentPwd, setCurrentPwd] = useState("");

    const checkIdExists = async () => {
        try {
            setErrors(prev => ({
                ...prev,
                checkIdError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                checkIdMsg: "확인되었습니다"
            }));
        } catch (e) {
            setErrors(prev => ({
                ...prev,
                checkIdError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                checkIdMsg: "존재하지 않는 아이디입니다"
            }));
            console.log(e);
        }
    };

    // 나중에 post 요청 주소 바꿀 것
    const [requsetAuthCodeState, requestAuthCodeByPhoneNumber] = useRequestAuthCodeAsync(phoneNumber, inputCodeRef, setErrors, setInputTestMsg);
    const [verifyAuthCodeState, verifyAuthCode] = useVerifyAuthCodeAsync(phoneNumber, code, setErrors, setInputTestMsg);


    // 제출하는 함수
    const onSubmit = async () => {
        if (currentSection === "before") {
            setCurrentSection("after");
            gsap.to(".slider", {
                x: "-100%",
                duration: .5,
                ease: "power3.out"
            })
        }
        else {
            try {
                console.log({
                    newPwd: newPwd,
                });
                alert("비밀번호 변경 성공!");
                navigate("/login");
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        if (code.length === 6) {
            verifyAuthCode();
        }
    }, [code]);

    useEffect(() => {
        if (!inputRegexs.pwReg.test(newPwd)) {

            setErrors(prev => ({
                ...prev,
                newPwdError: true
            }));

            setInputTestMsg(prev => ({
                ...prev,
                newPwdMsg: "비밀번호는 최소 하나의 특수문자를 포함하여 8~15글자이어야 합니다"
            }))
        }
        else {
            if (newPwd === currentPwd) {
                setErrors(prev => ({
                    ...prev,
                    newPwdError: true
                }));

                setInputTestMsg(prev => ({
                    ...prev,
                    newPwdMsg: "이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다"
                }))
            }
            else {
                setErrors(prev => ({
                    ...prev,
                    newPwdError: false
                }));

                setInputTestMsg(prev => ({
                    ...prev,
                    newPwdMsg: "사용 가능한 비밀번호입니다"
                }))
            }
        }
    }, [newPwd]);

    useEffect(() => {
        if (matchNewPwd !== newPwd) {
            setErrors(prev => ({
                ...prev,
                matchNewPwdError: true
            }));

            setInputTestMsg(prev => ({
                ...prev,
                matchNewPwdMsg: "비밀번호가 일치하지 않습니다"
            }));
        }
        else {
            setErrors(prev => ({
                ...prev,
                matchNewPwdError: false
            }));

            setInputTestMsg(prev => ({
                ...prev,
                matchNewPwdMsg: "비밀번호가 일치합니다"
            }));
        }
    }, [matchNewPwd, newPwd]);

    // useEffect(()=>{
    //     console.log(errors);
    // }, [errors]);

    return (
        <StyledResetPwd className='pageContainer'>
            <div className="find-id-content">
                <div className="logo-wrapper">
                    <img
                        src={sign_up_logo}
                        alt="logo"
                    />
                </div>

                <div className="input-wrapper">
                    <h2>비밀번호 재설정</h2>

                    <div className="inputs">
                        <div className="slider">
                            <div className="slide-item before">
                                <div className="input id-input">
                                    <Title $isFocused={isFocused} $target="idFocus">아이디</Title>
                                    <input
                                        type="text"
                                        required
                                        value={id}
                                        onChange={handleId}
                                        name='id'
                                        maxLength={12}
                                        onFocus={() => {
                                            setIsFocused({
                                                idFocus: true,
                                                phoneNumberFocus: false,
                                                codeFocus: false,
                                                newPwdFocus: false,
                                                matchNewPwdFocus: false
                                            })
                                        }}
                                    />
                                    <button
                                        onClick={checkIdExists}
                                        disabled={id.length === 0}
                                    >
                                        확인
                                    </button>
                                    <Msg
                                        error={errors.checkIdError}
                                        text={inputTestMsg.checkIdMsg}
                                    />
                                </div>

                                <div className="input phone-number-input">
                                    <Title $isFocused={isFocused} $target="phoneNumberFocus">전화번호</Title>
                                    <input
                                        type="text"
                                        required
                                        value={phoneNumber}
                                        onChange={handlePhoneNumber}
                                        name="phone-number"
                                        maxLength={13}
                                        onFocus={() => {
                                            setIsFocused({
                                                idFocus: false,
                                                phoneNumberFocus: true,
                                                codeFocus: false,
                                                newPwdFocus: false,
                                                matchNewPwdFocus: false
                                            })
                                        }}
                                    />
                                    <button
                                        onClick={requestAuthCodeByPhoneNumber}
                                        disabled={phoneNumber.length !== 13}
                                    >
                                        인증받기
                                    </button>

                                    {errors.phoneNumberError && (
                                        <Msg
                                            error={errors.phoneNumberError}
                                            text={inputTestMsg.phoneNumberMsg}
                                        />
                                    )}
                                </div>

                                <div className="input verification-code-input">
                                    <Title $isFocused={isFocused} $target="codeFocus">인증번호 입력</Title>
                                    <input
                                        type="text"
                                        required
                                        value={code}
                                        onChange={handleCode}
                                        disabled={errors.phoneNumberError}
                                        ref={inputCodeRef}
                                        maxLength={6}
                                        onFocus={() => {
                                            setIsFocused({
                                                idFocus: false,
                                                phoneNumberFocus: false,
                                                codeFocus: true,
                                                newPwdFocus: false,
                                                matchNewPwdFocus: false
                                            })
                                        }}
                                    />
                                    {code !== "" && (
                                        <Msg
                                            error={errors.verificationCodeError}
                                            text={inputTestMsg.codeMsg}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="slide-item after">

                                <div className="input new-pwd-input">
                                    <Title $isFocused={isFocused} $target="newPwdFocus">새로운 비밀번호</Title>
                                    <input
                                        type="text"
                                        required
                                        value={newPwd}
                                        onChange={handleNewPwd}
                                        onFocus={() => {
                                            setIsFocused({
                                                idFocus: false,
                                                phoneNumberFocus: false,
                                                codeFocus: false,
                                                newPwdFocus: true,
                                                matchNewPwdFocus: false
                                            })
                                        }}
                                    />
                                    {newPwd !== "" && (
                                        <Msg
                                            error={errors.newPwdError}
                                            text={inputTestMsg.newPwdMsg}
                                        />
                                    )}
                                </div>

                                <div className="input new-pwd-input">
                                    <Title $isFocused={isFocused} $target="matchNewPwdFocus">비밀번호 확인</Title>

                                    <input
                                        type="text"
                                        required
                                        value={matchNewPwd}
                                        onChange={handleMatchNewPwd}
                                        onFocus={() => {
                                            setIsFocused({
                                                idFocus: false,
                                                phoneNumberFocus: false,
                                                codeFocus: false,
                                                newPwdFocus: false,
                                                matchNewPwdFocus: true
                                            })
                                        }}
                                    />
                                    {matchNewPwd !== "" && (
                                        <Msg
                                            error={errors.matchNewPwdError}
                                            text={inputTestMsg.matchNewPwdMsg}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    className="next"
                    disabled={(currentSection === "before" &&
                        errors.checkIdError ||
                        errors.phoneNumberError ||
                        errors.verificationCodeError
                    ) || (currentSection === "after" &&
                        errors.newPwdError ||
                        errors.matchNewPwdError
                        )}
                >
                    다음
                </button>
            </div>
        </StyledResetPwd>
    );
};

const StyledResetPwd = styled.section`
    height: 100vh;
    /* 마진 상쇄 방지 border */
    border: .000000000001px solid transparent;

    .find-id-content {
        margin: 178px 16px 0 16px;

        .logo-wrapper {
            width: 90px;
            aspect-ratio: 1/1;
            border-radius: 100%;
            overflow: hidden;
            margin-bottom: 44px;

            img {
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }

        .input-wrapper {
            > h2 {
                font-size: 20px;
                margin-bottom: 44px;
            }

            .inputs {
                width: 100%;
                overflow-x: hidden;

                .slider {
                    width: 100%;
                    display: flex;
                    /* transform: translateX(-100%); */

                    .slide-item {
                        flex-shrink: 0;
                        width: 100%;
                    }

                    .before {
                        /* 없으면 빈 상태로 냅둬 */
                    }

                    .after {
                        /* 없으면 빈 상태로 냅둬 */
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

                            &:focus {
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

                        button:disabled {
                            background-color: ${colors.gray2};
                            color: #9FA4A8;
                            pointer-events: none;
                        }
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

export default ResetPwd;
