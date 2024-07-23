import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { useNavigate } from 'react-router-dom';
import sign_up_logo from "../../assets/images/sign_up_logo.png";

const ViewUserId = () => {
    const navigate = useNavigate();

    return (
        <StyledViewUserId className='pageContainer'>
            <div className="view-user-id-content">
                <div className="logo-wrapper">
                    <img
                        src={sign_up_logo}
                        alt="logo"
                    />
                </div>
                <h2>회원님의 아이디 정보입니다.</h2>
                <p>testuser123</p>
                <hr />
                <div className='nav'>
                    <span onClick={()=>{
                        navigate("/login")
                    }}>로그인</span>
                    <span>|</span>
                    <span onClick={() => {
                        navigate("/resetpassword")
                    }}>비밀번호 찾기</span>
                </div>

                <button onClick={()=>{
                    navigate("/login");
                }}>확인</button>
            </div>
        </StyledViewUserId>
    );
};

const StyledViewUserId = styled.section`
    height: 100vh;
    // 마진 상쇄 방지 border
    border: .000000000001px solid transparent;
    
    .view-user-id-content{
        margin: 178px 16px 0 16px;

        .logo-wrapper {
            width: 90px;
            aspect-ratio: 1/1;
            border-radius: 100%;
            overflow: hidden;
            margin: 0 auto;
            margin-bottom: 169px;

            img {
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }

        h2{
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 36px;
        }

        p{
            margin-bottom: 4px;
            font-size: 20px;
        }

        hr{
            border: 1px solid ${colors.gray3};
            margin-bottom: 16px;
        }

        .nav{
            display: flex;
            width: 100%;
            justify-content: flex-end;
            margin-bottom: 208px;
            
            span{
                font-size: 10px;
                color: ${colors.gray5};

                &:first-child,
                &:last-child{
                    cursor: pointer;
                }

                &:first-child:hover,
                &:last-child:hover{
                    color: ${colors.mainColor};
                }

                &:nth-child(2){
                    margin: 0 5px;
                }
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
        }
    }
`;

export default ViewUserId;