import React from "react";
import styled from "styled-components";
import colors from "../../../../styles/colors";

const FilterButton = styled.button`
    padding: 0.8rem 2rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border: none;
    border-radius: 3rem;
    background-color: ${props => props.active === "true" ? colors.mainColor : colors.violet10};
    font-size: 1.6rem;
    color: ${props => props.active === "true" ? colors.gray1 : colors.gray5};
    cursor: pointer;

    @media screen and (max-width: 400px) {
        font-size: 1.2rem;
    }
    
    @media screen and (max-width: 375px) {
        padding: 0.8rem 3rem;
        font-size: 1.6rem;
    }

    @media screen and (max-width: 325px) {
        padding: 0.8rem 2.2rem;
    }
`;

// id 같은 거 뜨도록 필터링 버튼 구현함 -> 나중에 서버 연동 시 type으로 바꿀 것.
// 현재: 한식(1), 양식(2), ... 와 listMeal 통신 후 받은 데이터 배열의 id와 비교하여 같으면 뜨게 함
const ItemFilter = ({ id, name, isActive, handleSelection }) => {
    const handleClick = () => {
        handleSelection(id, !isActive);
    };

    return (
        <FilterButton active={isActive.toString()} onClick={handleClick} key={id}>
            {name}
        </FilterButton>
    );
};

export default ItemFilter;
