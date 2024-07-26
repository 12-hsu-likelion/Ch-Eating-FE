import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const CalendarDay = ({ dayInfo, isPrevMonth }) => {
    const { date, year, month, day, dayIndexOfWeek } = dayInfo;

    return (
        <StyledCalendarDay $isPrevMonth = {isPrevMonth}>
            {Number(day)}
        </StyledCalendarDay>
    );
};

const StyledCalendarDay = styled.li`
    width: 56px;
    height: 76px;
    font-size: 16px;
    color: ${colors.black};
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    padding-top: 6px;

    pointer-events: ${({$isPrevMonth})=>$isPrevMonth ? "none" : "auto"};
    opacity: ${({$isPrevMonth})=>$isPrevMonth ? 0 : 1};
    background-color: ${colors.white};
`;

export default CalendarDay;