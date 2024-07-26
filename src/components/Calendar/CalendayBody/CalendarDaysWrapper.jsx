import React from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../../context/CalendarContext';
import CalendarDay from './CalendarDay';
import { format } from 'date-fns';

const CalendarDaysWrapper = () => {
    const {daysInMonth, currentDate} = useCalendarContext();
    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd');

    return (
        <StyledCalendarDayWrapper>
            {daysInMonth.map((dayInfo, i)=>{
                return <CalendarDay isCurrent = {formattedDate === dayInfo.date} isPrevMonth = {dayInfo.month !== currentDate.month} key={i} dayInfo = {dayInfo} />
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

export default CalendarDaysWrapper;