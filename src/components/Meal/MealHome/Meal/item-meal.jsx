import styled from "styled-components";
import colors from "../../../../styles/colors";

const ItemContainer = styled.div`
    width: 100%;
    height: 9.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0.4rem;
    background-color: ${colors.mainColor};
`

const InnerContainer = styled.div`
    width: 85%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.8rem;
`

const TitleP1 = styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.gray1};
`

const TitleP2 = styled.p`
    font-size: 1.2rem;
    color: ${colors.gray3};
`

const ItemMeal = ({id, name, username, email}) => {
    return (
        <ItemContainer key={id}>
            <InnerContainer>
                <TitleContainer>
                    <TitleP1>{name}</TitleP1>
                    <TitleP2>{username}</TitleP2>
                </TitleContainer>
                <TitleP2 style={{color: colors.gray4, fontWeight: 300}}>{email}</TitleP2>
            </InnerContainer>
        </ItemContainer>
    )
}

export default ItemMeal;