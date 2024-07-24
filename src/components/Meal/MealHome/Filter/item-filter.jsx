import React, { useState } from "react";
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
`;

const ItemFilter = ({id, name}) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        console.log(name, "선택");
    };

    return (
        <FilterButton active={isActive.toString()} onClick={handleClick} key={id}>
            {name}
        </FilterButton>
    );
};

export default ItemFilter;
