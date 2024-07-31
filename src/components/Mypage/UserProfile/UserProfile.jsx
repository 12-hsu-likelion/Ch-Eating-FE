import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import { API } from "../../../api/axios";
import NoticeNot from "../../../assets/images/noticeNot.png";
import NoticeYes from "../../../assets/images/noticeYes.png";

const UserProfileP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`;

const MypageImg = styled.img`
    width: 9.6rem;
    height: 9.6rem;
    margin-top: 1.6rem;
`;

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const UserProfileP2 = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray5};
`;

const UserProfile = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('api/users/myPage');
                const userData = response.data.data;

                console.log(userData);

                setName(userData.userName || '정보 없음');
                setId(userData.userId || '정보 없음');

                if (userData.active && userData.active.notice !== undefined) {
                    setActive(userData.active.notice);
                } else {
                    setActive(false);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const getImage = () => {
        return active ? NoticeYes : NoticeNot;
    };

    return (
        <>
            <UserProfileP>내 계정</UserProfileP>
            <MypageImg src={getImage()} alt="profileImg" />

            <ProfileContainer style={{ marginTop: "3.2rem" }}>
                <UserProfileP2>이름</UserProfileP2>
                <UserProfileP2>{name}</UserProfileP2>
            </ProfileContainer>

            <ProfileContainer style={{ marginTop: "2rem" }}>
                <UserProfileP2>아이디</UserProfileP2>
                <UserProfileP2>{id}</UserProfileP2>
            </ProfileContainer>
        </>
    );
};

export default UserProfile;
