import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";

const AccountP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`;

const AccountP2 = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray5};
    cursor: pointer;
`;

const Account = ({ onLogoutClick, onDeleteClick }) => {
    const handleLogoutClick = () => {
        if (onLogoutClick) {
            onLogoutClick();
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
