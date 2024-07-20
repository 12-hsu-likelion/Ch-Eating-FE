import styled from "styled-components";
import colors from "../../styles/colors";
import { useInput } from "../../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const idRef = useRef();

    useEffect(()=>{
        idRef.current.focus();
    }, []);

    return (
        <StyledLogin className="pageContainer">
            <div className="login-content">

                <div className="logo-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgDGeD2i-CP1wlBlkU-sysJurmSISqB7-dA&s" alt="" />
                </div>

                <div className="input-section">
                    <h1>더 이상 배고픔에 속지 마세요.</h1>
                    <div className="inputs">
                        <input type="text" value={id} onChange={handleId} required placeholder="아이디" ref={idRef}/>
                        <input type="password" value={pw} onChange={handlePw} required placeholder="비밀번호"/>
                        {error && (
                            <p>아이디 혹은 비밀번호가 틀렸습니다.</p>
                        )}
                    </div>
                    <button disabled={(id.length === 0 || pw.length === 0)} onClick={()=>{
                        setError(true)
                    }}>로그인하기</button>
                    <div className="id-pw-recovery">
                        <span>아이디 찾기</span>
                        <span>|</span>
                        <span>비밀번호 찾기</span>
                    </div>
                </div>

                <div className="navi-to-signup">
                    아직 회원이 아니세요? <span onClick={()=>navigate("/signup")}>회원가입하기</span>
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
                padding: 18px 164px;
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

            .id-pw-recovery{
                width: 153px;
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
                color: #9FA4A8;
                font-size: 12px;

                span:first-child,
                span:last-child{
                    cursor: pointer;
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