import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import colors from '../../styles/colors';
import Msg from '../../components/LoginAndSignUp/InputMessage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRequestAuthCodeAsync, useVerifyAuthCodeAsync } from '../../hooks/useAsync';

const FindId = () => {
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [inputTestMsg, setInputTestMsg] = useState({
        phoneNumberMsg: "",
        codeMsg: ""
    });

    const [errors, setErrors] = useState({
        phoneNumberError: true,
        verificationCodeError: true
    })

    const [isFocused, setIsFocused] = useState({
        phoneNumberFocus: false,
        codeFocus: false
    });

    const inputCodeRef = useRef();
    const navigate = useNavigate();

    // 비동기 처리 로직들
    const [requsetAuthCodeState, requestAuthCodeByPhoneNumber] = useRequestAuthCodeAsync(phoneNumber, inputCodeRef, setErrors, setInputTestMsg);
    const [verifyAuthCodeState, verifyAuthCode] = useVerifyAuthCodeAsync(code, setErrors, setInputTestMsg);

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

    // useEffect(()=>{
    //     console.log(errors);
    // }, [errors]);

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
                        <button onClick={requestAuthCodeByPhoneNumber} disabled={phoneNumber.length !== 13}>
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
                        <Msg error={errors.verificationCodeError} text={inputTestMsg.codeMsg} />
                    </div>
                </div>

                <button
                    onClick={onFindId}
                    className="find"
                    disabled={errors.phoneNumberError || errors.verificationCodeError}
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
