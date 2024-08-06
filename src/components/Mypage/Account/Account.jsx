import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import { API } from "../../../api/axios";

const AccountP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`;

const AccountP2 = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray5};
    cursor: pointer;
    font-weight: 500;
`;

const Account = ({ onLogoutClick, onDeleteClick }) => {
    const handleLogoutClick = async () => {
    try {
        const response = await API.post('/api/users/logout');
        console.log('Response:', response); 

        if (onLogoutClick) {
            onLogoutClick();
        }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteClick = () => {
        if (onDeleteClick) {
            onDeleteClick();
        }
    };

    return (
        <>
            <AccountP>계정관리</AccountP>

            <AccountP2 style={{ marginTop: "3.2rem" }} onClick={handleLogoutClick}>로그아웃</AccountP2>
            <AccountP2 style={{ marginTop: "2rem" }} onClick={handleDeleteClick}>회원탈퇴</AccountP2>
        </>
    );
};

export default Account;
