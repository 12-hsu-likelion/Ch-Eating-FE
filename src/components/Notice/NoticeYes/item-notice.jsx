import styled from "styled-components";
import colors from "../../../styles/colors";
import NoticeLogo from "../../../assets/images/noticeLogo.png";

const ItemContainer = styled.div`
    width: 100%;
    height: 10rem;
    background-color: ${colors.violet10};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.05rem solid ${colors.gray3};
`

const InnerContainer = styled.div`
    width: 90%;
    display: flex;
    gap: 1.2rem;
`

const LogoImg = styled.img`
    width: 4.1rem;
`

const RightContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TitleP = styled.p`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colors.black};
`

const TitleP2 = styled.p`
    font-size: 1rem;
    font-weight: 300;
    color: ${colors.gray4};
`

const ItemNotice = ({ date }) => {
    return (
        <ItemContainer>
            <InnerContainer>
                <LogoImg src={NoticeLogo} alt="noticeLogo" />

                <RightContainer>
                    <TitleP>혹시 지금 배고프지 않나요? 진짜 배고픔인지 확인해보세요!</TitleP>
                    <TitleP2>{date}</TitleP2>
                </RightContainer>
            </InnerContainer>
        </ItemContainer>
    )
}

export default ItemNotice;