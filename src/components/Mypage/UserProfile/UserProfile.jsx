import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import { API } from "../../../api/axios";
import NoticeNot from "../../../assets/images/noticeNot.png";
import NoticeYes from "../../../assets/images/noticeYes.png";
import { format, parseISO } from 'date-fns';

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
    font-weight: 500;
`;

const UserProfile = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [hasDataToday, setHasDataToday] = useState(false);
    const [profileImage, setProfileImage] = useState(NoticeNot);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userResponse = await API.get('api/users/myPage');
                const userData = userResponse.data.data;

                setName(userData.userName || '정보 없음');
                setId(userData.userId || '정보 없음');

                const mealResponse = await API.get('/api/meal/meals', {
                    params: { userId: userData.userId }
                });
                const meals = mealResponse.data.data;

                const today = new Date();
                const todayFormatted = format(today, 'yyyy-MM-dd');
                
                const hasMealsToday = meals.some(meal => format(parseISO(meal.createAt), 'yyyy-MM-dd') === todayFormatted);
                setHasDataToday(hasMealsToday);
                setProfileImage(hasMealsToday ? NoticeYes : NoticeNot);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <UserProfileP>내 계정</UserProfileP>
            <MypageImg src={profileImage} alt="profileImg" />

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
