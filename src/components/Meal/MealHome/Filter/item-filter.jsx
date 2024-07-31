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
    font-size: 1.2rem;
    color: ${props => props.active === "true" ? colors.gray1 : colors.gray5};
    cursor: pointer;
    
    @media screen and (max-width: 375px) {
        padding: 0.8rem 3rem;
        font-size: 1.6rem;
    }

    @media screen and (max-width: 325px) {
        padding: 0.8rem 2.2rem;
    }
`;

const ItemFilter = ({ id, type, name, isActive, handleSelection }) => {
    const handleClick = () => {
        handleSelection(type, !isActive);
    };

    return (
        <FilterButton active={isActive.toString()} onClick={handleClick}>
            {name}
        </FilterButton>
    );
};

export default ItemFilter;
