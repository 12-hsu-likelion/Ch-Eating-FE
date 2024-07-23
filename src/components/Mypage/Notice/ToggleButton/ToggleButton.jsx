import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../../styles/colors";

const ToogleContainer = styled.div`
    width: 6.4rem;
    height: 3.2rem;
    background-color: ${(props) => (props.active === "true" ? colors.gray2 : colors.subColor)};
    border: none;
    border-radius: 2.4rem;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.4rem;
    justify-content: ${(props) => (props.active === "true" ? "flex-start" : "flex-end")};
`;

const ToogleCircle = styled.div`
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    background-color: white;
    border: none;
    border-radius: 50%;
`

const ToggleButton = ({ defaultActive = false, onClick }) => {
    const [active, setActive] = useState(defaultActive);

    const handleClick = () => {
        setActive(!active);

        if (onClick) {
            onClick(!active);
        }
    };

    return (
        <ToogleContainer onClick={handleClick} active={active.toString()}>
            <ToogleCircle />
        </ToogleContainer>
    );
};

export default ToggleButton;
