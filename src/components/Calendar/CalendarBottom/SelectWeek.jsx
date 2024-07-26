import React from 'react';
import styled from 'styled-components';

const SelectWeek = ({text}) => {
    return (
        <StyledSelectWeek>
            {text}
        </StyledSelectWeek>
    );
};

const StyledSelectWeek = styled.li`
    display: inline-block;
    margin: 0 28px 0 13px;
    font-weight: 400;
`;

export default SelectWeek;