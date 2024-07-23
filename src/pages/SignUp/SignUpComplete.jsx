import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";
import sign_up_logo from "../../assets/images/sign_up_logo.png";
// import welcome from "../../assets/images/welcome_svg.png";

const SignUpComplete = () => {
    const navigate = useNavigate();
    const tl = gsap.timeline();

    useEffect(() => {
        tl.from(".logo-wrapper", {
            y: 30,
            opacity: 0,
            duration: .5
        }).from(".msg", {
            y: 30,
            opacity: 0,
            duration: .5
        }, "-=.3")
            .from(".btn", {
                opacity: 0,
                duration: .3
            }, "-=.1");
    }, []);

    return (
        <StyledSignUpComplete className='pageContainer'>
            <div className="sign-up-complete-wrapper">
                <div className="img-wrapper">
                    <div className="welcome-wrapper">
                        <img src="" alt="" />
                    </div>
                    <div className="logo-wrapper">
                        <img src={sign_up_logo} alt="logo" />
                    </div>
                </div>

                <h2 className='msg'>회원가입이 완료되었어요!</h2>

                <button className='btn' onClick={() => {
                    navigate("/login");
                }}>확인</button>
            </div>
        </StyledSignUpComplete>
    );
};

const StyledSignUpComplete = styled.section`
    height: 100vh;
    //마진 상쇄 방지 border
    border: .000000000001px solid transparent;

    .sign-up-complete-wrapper{
        margin: 240px 16px 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
        
        .img-wrapper{
            position: relative;
            margin-bottom: 46px;

            .logo-wrapper{
                width: 168px;
                aspect-ratio: 1/1;
                border-radius: 100%;
                background-color: #D9D9D9;
                overflow: hidden;
            }

            .welcome-wrapper{
                position: absolute;
                z-index: 2;
                right: -50px;
            }
        }
        
        h2{
            font-size: 20px;
            margin-bottom: 278px;
            font-weight: 600;
        }

        button{
            width: 100%;
            background-color: ${colors.mainColor};
            font-size: 16px;
            padding: 18px 164px;
            color: ${colors.gray1};
            white-space: nowrap;
            border-radius: 29px;
        }
    }
`

export default SignUpComplete;