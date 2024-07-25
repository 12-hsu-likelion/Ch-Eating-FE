import styled from "styled-components";
import colors from "../../styles/colors";
import ListNotice from "../../components/Notice/list-notice";

const NoticeContainer = styled.div`
    width: 100%;
    padding-top: 8.6rem;
`

const NoticeP = styled.p`
    font-size: 1.2rem;
    color: ${colors.gray5};
    margin-left: 1.6rem;
`

const NoticeBar = styled.div`
    width: 100%;
    height: 0.1rem;
    border: none;
    background-color: ${colors.gray3};
    margin-top: 0.8rem;
`

const Notice = () => {
    return (
        <div className="pageContainer">
            <NoticeContainer>
                <NoticeP>내 알림</NoticeP>
                <NoticeBar />

                <ListNotice />
            </NoticeContainer>
        </div>
    )
}

export default Notice;