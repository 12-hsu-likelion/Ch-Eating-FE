import React from "react";
import styled from "styled-components";
import ToggleButton from "./ToggleButton/ToggleButton";
import colors from "../../../styles/colors";
import axios from "axios"

const NoticeP = styled.p`
    font-size: 2.4rem;
    color: ${colors.black};
    font-weight: 600;
`;

const NoticeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Notice2 = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray5};
`;

const Notice = () => {
    const handleToggle = async (active, type) => {
        try {
            const response = await axios.patch("https://jsonplaceholder.typicode.com/users/1", {
                type,
                active,
            });
            
            console.log(`Toggle ${type}: ${active} 전송됨`);
            console.log("서버로부터 받은 응답:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <NoticeP>알림설정</NoticeP>

            <NoticeContainer style={{ marginTop: "3.2rem" }}>
                <Notice2>알림</Notice2>
                <ToggleButton defaultActive={true} onClick={(active) => handleToggle(active, "notice")} />
            </NoticeContainer>
        </>
    );
};

export default Notice;
