import styled from "styled-components";
import colors from "../../../styles/colors";

const NotContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 29.1rem 0 39.9rem 0;
`

const NotP = styled.p`
    font-size: 2rem;
    color: ${colors.gray4};
`

const NoticeNot = () => {
    return (
        <NotContainer>
            <NotP>알림이 없어요!</NotP>
        </NotContainer>
    )
}

export default NoticeNot;