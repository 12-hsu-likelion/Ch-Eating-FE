import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import colors from '../../styles/colors';
import Msg from '../../components/LoginAndSignUp/InputMessage';
import { useNavigate } from 'react-router-dom';

const FindId = () => {
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [inputTestMsg, setInputTestMsg] = useState({
        phoneNumberMsg: "",
        codeMsg: ""
    });

    const [errors, setErrors] = useState({
        phoneNumberError: true,
        codeError: true
    })

    const [isFocused, setIsFocused] = useState({
        phoneNumberFocus: false,
        codeFocus: false
    });

    const inputCodeRef = useRef();
    const navigate = useNavigate();

    const sendAuthCode = async () => {
        try {
            setErrors(prev => ({
                ...prev,
                phoneNumberError: false
            }));
            alert(`${phoneNumber}로 6자리 인증코드가 발송되었습니다!`);
            setTimeout(() => {
                if (inputCodeRef.current) {
                    inputCodeRef.current.focus();
                }
            }, 0);
        } catch (e) {
            setErrors(prev => ({
                ...prev,
                phoneNumberError: true
            }));
            // 전화번호가 없을 시 상태코드 받아와서 밑에 코드 실행
            setInputTestMsg(prev => ({
                ...prev,
                phoneNumberMsg: "가입되지 않은 전화번호입니다."
            }))
            console.log(e);
        }
    };

    const verifyAuthCode = async () => {
        try {
            setErrors(prev => ({
                ...prev,
                codeError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증되었습니다"
            }));
        } catch (e) {
            setErrors(prev => ({
                ...prev,
                codeError: true
            }));
            console.log(e);
            setInputTestMsg(prev => ({
                ...prev,
                codeMsg: "인증번호가 올바르지 않습니다"
            }));
        }
    };

    const onFindId = async() => {
        try{
            navigate("/viewuserid");
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(code.length===6){
            verifyAuthCode();
        }
    }, [code]);

    return (
        <StyledFindId className='pageContainer'>
            <div className="find-id-content">
                <div className="logo-wrapper">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgDGeD2i-CP1wlBlkU-sysJurmSISqB7-dA&s"
                        alt=""
                    />
                </div>
                <h2>아이디 찾기</h2>

                <div className="input-wrapper">
                    <div className="input phone-number-input">
                        <Title $isFocused={isFocused} $target="phoneNumberFocus">
                            전화번호
                        </Title>
                        <input
                            type="text"
                            required
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            maxLength={13}
                            onFocus={() => {
                                setIsFocused({
                                    phoneNumberFocus: true,
                                    codeFocus: false,
                                });
                            }}
                        />
                        <button onClick={sendAuthCode} disabled={phoneNumber.length !== 13}>
                            인증받기
                        </button>
                        {errors.phoneNumberError && (
                            <Msg
                                error={errors.phoneNumberError}
                                text={inputTestMsg.phoneNumberMsg}
                            />
                        )}
                    </div>

                    <div className="input phone-number-input">
                        <Title $isFocused={isFocused} $target="codeFocus">
                            인증번호 입력
                        </Title>
                        <input
                            type="text"
                            required
                            value={code}
                            onChange={handleCode}
                            maxLength={6}
                            ref={inputCodeRef}
                            disabled={errors.phoneNumberError}
                            onFocus={() => {
                                setIsFocused({
                                    phoneNumberFocus: false,
                                    codeFocus: true,
                                });
                            }}
                        />
                        <Msg error={errors.codeError} text={inputTestMsg.codeMsg} />
                    </div>
                </div>

                <button
                    onClick={onFindId}
                    className="find"
                    disabled={errors.phoneNumberError || errors.codeError}
                >
                    다음
                </button>
            </div>
        </StyledFindId>
    );
};

const StyledFindId = styled.section`
    height: 100vh;
    // 마진 상쇄 방지 border
    border: .000000000001px solid transparent;

    .find-id-content {
        margin: 176px 16px 0 16px;

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

        > h2 {
            font-size: 20px;
            margin-bottom: 44px;
        }

        .input-wrapper {
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

        .find {
            background-color: ${colors.mainColor};
            width: 100%;
            border-radius: 29px;
            font-size: 16px;
            color: ${colors.gray1};
            padding: 18px 0;
            margin-top: 130px;
        }

        .find:disabled {
            background-color: ${colors.gray2};
            color: #9FA4A8;
            pointer-events: none;
        }
    }
`;

const Title = styled.p`
    font-size: 14px;
    color: ${({ $target, $isFocused }) =>
        $isFocused[$target] ? colors.mainColor : colors.gray5};
    margin-bottom: 8px;
    font-weight: 600;
`;

export default FindId;
