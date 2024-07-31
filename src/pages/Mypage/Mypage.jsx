import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import Notice from "../../components/Mypage/Notice/Notice";
import Account from "../../components/Mypage/Account/Account";
import Logout from "../../components/Mypage/Account/Logout/Logout";
import Delete from "../../components/Mypage/Account/Delete/Delete";
import RealDelete from "../../components/Mypage/Account/Delete/RealDelete";

const MypageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 0.05rem solid ${colors.gray2};
    background-color: white;
`

const Mypage = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showRealDelete, setShowRealDelete] = useState(false);

    const handleLogoutClick = () => {
        localStorage.clear();
        console.log("로그아웃 완료");
        
        setShowLogout(true);
    };

    const handleDeleteClick = () => {
        setShowDelete(true);
    };

    const handleDeleteConfirm = () => {
        setShowDelete(false);
        setShowRealDelete(true);
    };

    const handleDeleteCancel = () => {
        setShowDelete(false);
    }

    return (
        <div className="pageContainer" style={{display: "flex", alignItems: "center", flexDirection: "column", position: "relative"}}>
            <MypageContainer style={{padding: "8.8rem 5% 4.6rem 5%"}}>
                <UserProfile />
            </MypageContainer>
                
            <MypageContainer style={{padding: "2.8rem 5% 4.7rem 5%", marginTop: "2rem"}}>
                <Notice />
            </MypageContainer>

            <MypageContainer style={{padding: "2.8rem 5% 4.7rem 5%", marginTop: "2rem", marginBottom: "7.7rem"}}>
                <Account onLogoutClick={handleLogoutClick} onDeleteClick={handleDeleteClick} />
            </MypageContainer>

            {showLogout && <Logout />}
            {showDelete && <Delete onDeleteConfirm={handleDeleteConfirm} onDeleteCancel={handleDeleteCancel}/>}
            {showRealDelete && <RealDelete />}
        </div>
    )
}

export default Mypage;