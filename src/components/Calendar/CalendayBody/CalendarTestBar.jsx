import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const CalendarTestBar = ({isFakeHunger}) => {
    return (
        <StyledCalendarTestBar $isFakeHunger = {isFakeHunger}>
            
        </StyledCalendarTestBar>
    );
};

const StyledCalendarTestBar = styled.div`
    width: 100%;
    height: 6px;
    border-radius: 10px;
    background-color: ${({$isFakeHunger})=>$isFakeHunger ? "#FF4242" : "#32FF6E"};
    margin-bottom: 3px;
`;

export default CalendarTestBar;