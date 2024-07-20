import React, { useEffect, useRef, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Msg from '../../components/LoginAndSignUp/InputMessage';
import gsap from "gsap";

const ResetPwd = () => {
    const [id, handleId, setId] = useInput("");
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [resetPwd, handleResetPwd, setResetPwd] = useInput("");
    const [matchPwd, handleMatchPwd, setMatchPwd] = useInput("");

    const [inputTestMsg, setInputTestMsg] = useState({
        checkIdMsg: "",
        codeMsg: ""
    });

    const [errors, setErrors] = useState({
        checkIdError: true,
        verificationCodeError: true
    });

    const [currentSection, setCurrentSection] = useState("before");

    const inputCodeRef = useRef();

    const checkIdExists = async () => {
        try {
            setErrors(prev => ({
                ...prev,
                checkIdError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                checkIdMsg: "확인되었습니다."
            }));
        } catch (e) {
            setErrors(prev => ({
                ...prev,
                checkIdError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                checkIdMsg: "존재하지 않는 아이디입니다."
            }));
            console.log(e);
        }
    };

    const sendAuthCode = () => {
        alert(`${phoneNumber}로 6자리 인증코드가 발송되었습니다!`);
        inputCodeRef.current.focus();
    };

    const verifyAuthCode = async () => {
        try {
            setErrors(prev => ({
                ...prev,
                verificationCodeError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증되었습니다"
            }));
        } catch (e) {
            setErrors(prev => ({
                ...prev,
                verificationCodeError: true
            }));
            console.log(e);
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증번호가 올바르지 않습니다"
            }));
        }
    };

    const onSubmit = async () => {
        if (currentSection === "before") {
            setCurrentSection("after");
            gsap.to(".slider", {
                x: "-100%",
                duration: .5,
                ease: "power2.out"
            })
        }
        else {
            try {
                console.log("asdsa");
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        if (code.length === 6) {
            verifyAuthCode();
        }
    }, [code]);

    return (
        <StyledResetPwd className='pageContainer'>
            <div className="find-id-content">
                <div className="logo-wrapper">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgDGeD2i-CP1wlBlkU-sysJurmSISqB7-dA&s"
                        alt=""
                    />
                </div>

                <div className="input-wrapper">
                    <h2>비밀번호 재설정</h2>

                    <div className="inputs">
                        <div className="slider">
                            <div className="slide-item before">
                                <div className="input id-input">
                                    <p>아이디</p>
                                    <input
                                        type="text"
                                        required
                                        value={id}
                                        onChange={handleId}
                                        name='id'
                                        maxLength={12}
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
                                    <p>전화번호</p>
                                    <input
                                        type="text"
                                        required
                                        value={phoneNumber}
                                        onChange={handlePhoneNumber}
                                        name="phone-number"
                                        maxLength={13}
                                    />
                                    <button
                                        onClick={sendAuthCode}
                                        disabled={phoneNumber.length !== 13}
                                    >
                                        인증받기
                                    </button>
                                </div>

                                <div className="input verification-code-input">
                                    <p>인증번호 입력</p>
                                    <input
                                        type="text"
                                        required
                                        value={code}
                                        onChange={handleCode}
                                        ref={inputCodeRef}
                                        maxLength={6}
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
                                {/* 추가 내용 */}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    className="next"
                    disabled={(currentSection === "before" &&
                        errors.checkIdError ||
                        errors.verificationCodeError
                    ) || currentSection === "after"}
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
                    transform: translateX(-100%);

                    .slide-item {
                        flex-shrink: 0;
                        width: 100%;
                    }

                    .before {
                        /* 스타일 추가 */
                    }

                    .after {
                        border: 1px solid;
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

export default ResetPwd;
