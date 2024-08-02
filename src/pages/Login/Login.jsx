import styled from "styled-components";
import colors from "../../styles/colors";
import { useInput } from "../../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import sign_up_logo from "../../assets/images/sign_up_logo.png";
import axios from "axios";
import { useLoginAsync } from "../../hooks/useAsync";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [error, setError] = useState(true);

    const [message, setMessage] = useState("");

    const idRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname || "/home";

    const [loginState, onLogin] = useLoginAsync(id, pw, setError, setMessage, from);

    useEffect(() => {
        idRef.current.focus();
    }, []);

    return (
        <StyledLogin className="pageContainer">
            <div className="login-content">

                <div className="logo-wrapper">
                    <img src={sign_up_logo} alt="logo" />
                </div>

                <div className="input-section">
                    <h1>더 이상 배고픔에 속지 마세요.</h1>
                    <div className="inputs">
                        <input type="text" value={id} onChange={handleId} required placeholder="아이디" ref={idRef} />
                        <input type="password" value={pw} onChange={handlePw} required placeholder="비밀번호" />
                        {error && (
                            <p>{message}</p>
                        )}
                    </div>
                    <button disabled={(id.length < 6 || pw.length < 8)} onClick={onLogin}>로그인하기</button>
                </div>

                <div className="navi-to-signup">
                    아직 회원이 아니세요? <span onClick={() => navigate("/signup")}>회원가입하기</span>
                </div>
            </div>
        </StyledLogin>
    )
}

const StyledLogin = styled.section`
    height: 100vh;
    //마진 상쇄 방지 border
    border: .000000000001px solid transparent;

    .login-content{
        /* 시간, 배터리 나와있는 header가 스마트폰 시스템 기본 header라면 margin top을 수정할 것 */
        margin: 230px 16px 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo-wrapper{
            width: 90px;
            aspect-ratio: 1/1;
            border-radius: 100%;
            background-color: #D9D9D9;
            overflow: hidden;
            margin-bottom: 41px;

            img{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }

        .input-section{
            width: 100%;
            margin-bottom: 69px;
            
            h1{
                color: ${colors.black};
                font-size: 19px;
                margin-bottom: 20px;
            }

            .inputs{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-bottom: 6px;
                min-height: 139.5px;

                input{
                    border: .5px solid ${colors.gray5};
                    border-radius: 4px;
                    font-size: 16px;
                    padding: 18px 16px;
                    min-height: 56.5px;

                    &:focus{
                        border: 1px solid ${colors.mainColor};
                    }

                    &:first-child{
                        margin-bottom: 8px;
                    }
                }

                p{
                    color: ${colors.error};
                    font-size: 12px;
                    margin-top: 4px;
                }
            }

            button{
                width: 100%;
                background-color: ${colors.mainColor};
                font-size: 16px;
                padding: 18px 0;
                color: ${colors.gray1};
                white-space: nowrap;
                border-radius: 29px;
                margin-bottom: 8px;

                &:disabled{
                    color: #9FA4A8;
                    background-color: ${colors.gray2};
                    pointer-events: none;
                }
            }
        }

        .navi-to-signup{
            font-size: 16px;
            color: ${colors.gray5};

            span{
                color: ${colors.mainColor};
                cursor: pointer;
            }
        }
    }
`;

export default Login;