import styled from "styled-components";
import colors from "../../../../styles/colors";

const EatContainer = styled.div`
    width: calc(100% - 0rem / 4);
    height: 12.8rem;
    background-color: ${colors.mainColor};
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: none;
    border-radius: 0.8rem;
`

const EatTitleP = styled.p`
    width: 5.6rem;
    height: 3.8rem;
    font-size: 1.6rem;
    color: ${colors.white};
    font-weight: 600;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`

const EatSubP = styled.p`
    width: 5.6rem;
    font-size: 1.2rem;
    color: ${colors.subColor};
    font-weight: 600;
    margin-top: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ItemEat = ({title, sub}) => {
    return (
        <EatContainer>
            <EatTitleP>{title}</EatTitleP>
            <EatSubP>{sub}</EatSubP>
        </EatContainer>
    )
}

export default ItemEat;