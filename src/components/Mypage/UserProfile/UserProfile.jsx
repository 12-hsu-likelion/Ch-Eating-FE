import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import axios from "axios";
import NoticeNot from "../../../assets/images/noticeNot.png";
import NoticeYes from "../../../assets/images/noticeYes.png";

const UserProfileP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`

const MypageImg = styled.img`
    width: 9.6rem;
    height: 9.6rem;
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
    const [id, setId] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
                const userData = response.data;
                console.log(userData);

                setName(userData.name || '정보 없음');
                setId(userData.id || '정보 없음');
                

                // 프로필 변화 -> 통신할 때 다시 확인할 것
                setActive(userData.active.notice || false);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const getImage = () => {
        if (!active) {
            return NoticeNot;
        } else {
            return NoticeYes;
        }
    };

    return (
        <>
            <UserProfileP>내 계정</UserProfileP>
            <MypageImg src={getImage()} alt="profileImg" />

            <ProfileContainer style={{marginTop: "3.2rem"}}>
                <UserProfileP2>이름</UserProfileP2>
                <UserProfileP2>{name}</UserProfileP2>
            </ProfileContainer>

            <ProfileContainer style={{marginTop: "2rem"}}>
                <UserProfileP2>아이디</UserProfileP2>
                <UserProfileP2>{id}</UserProfileP2>
            </ProfileContainer>
        </>
    )
}

export default UserProfile;