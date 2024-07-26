import React from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../context/CalendarContext';
import CalendarDay from './CalendarDay';

const CalendarDays = () => {
    const {daysInMonth, currentDate} = useCalendarContext();
    return (
        <StyledCalendarDayWrapper>
            {daysInMonth.map((dayInfo, i)=>{
                return <CalendarDay isPrevMonth = {dayInfo.month !== currentDate.month} key={i} dayInfo = {dayInfo} />
            })}
        </StyledCalendarDayWrapper>
    );
};

const StyledCalendarDayWrapper = styled.ul`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

export default CalendarDays;