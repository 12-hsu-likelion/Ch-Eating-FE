import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import MypageProfile from "../../../assets/images/mypageProfile.png";

const UserProfileP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`

const MypageImg = styled.img`
    width: 9.6rem;
    margin-top: 1.6rem;
`

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const UserProfileP2 = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray5};
`

const UserProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Name = localStorage.getItem('name');
                const Phone = localStorage.getItem('phone');

                if (Name) {
                    setName(Name);
                } else {
                    setName('정보 없음');
                }

                if (Phone) {
                    setPhone(Phone);
                } else {
                    setPhone('정보 없음');
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <UserProfileP>내 계정</UserProfileP>
            <MypageImg src={MypageProfile} alt="mypageProfile" />

            <ProfileContainer style={{marginTop: "3.2rem"}}>
                <UserProfileP2>이름</UserProfileP2>
                <UserProfileP2>{name}</UserProfileP2>
            </ProfileContainer>
            
            <ProfileContainer style={{marginTop: "2rem"}}>
                <UserProfileP2>전화번호</UserProfileP2>
                <UserProfileP2>{phone}</UserProfileP2>
            </ProfileContainer>
        </>
    )
}

export default UserProfile;