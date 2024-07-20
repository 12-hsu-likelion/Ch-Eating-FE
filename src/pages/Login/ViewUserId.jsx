import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { useNavigate } from 'react-router-dom';

const ViewUserId = () => {
    const navigate = useNavigate();

    return (
        <StyledViewUserId className='pageContainer'>
            <div className="view-user-id-content">
                <div className="logo-wrapper">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjgDGeD2i-CP1wlBlkU-sysJurmSISqB7-dA&s"
                        alt=""
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
    }
`;

export default ViewUserId;