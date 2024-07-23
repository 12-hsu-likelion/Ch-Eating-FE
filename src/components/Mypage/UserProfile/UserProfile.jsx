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
    const [phone, setPhone] = useState('');
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
                const userData = response.data;
                console.log(userData);

                setName(userData.name || '정보 없음');
                setPhone(userData.phone || '정보 없음');

                // 프로필 변화 -> 통신할 때 다시 확인할 것
                setActive1(userData.active.notice1 || false);
                setActive2(userData.active.notice2 || false);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const getImage = () => {
        if (!active1 && !active2) {
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
                <UserProfileP2>전화번호</UserProfileP2>
                <UserProfileP2>{phone}</UserProfileP2>
            </ProfileContainer>
        </>
    )
}

export default UserProfile;