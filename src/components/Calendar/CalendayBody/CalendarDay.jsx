import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import CalendarTestBar from './CalendarTestBar';

const CalendarDay = ({ dayInfo, isPrevMonth }) => {
    const { date, year, month, day, dayIndexOfWeek } = dayInfo;
    // 정보 객체 받아와서 fake인지 아닌지 확인하기

    return (
        <StyledCalendarDay $isPrevMonth = {isPrevMonth}>
            <span>
                {Number(day)}
            </span>
            <CalendarTestBar isFakeHunger={true} />
            <CalendarTestBar />
            <CalendarTestBar />

        </StyledCalendarDay>
    );
};

const StyledCalendarDay = styled.li`
    width: 56px;
    min-height: 76px;
    cursor: pointer;
    padding-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 11px;

    pointer-events: ${({$isPrevMonth})=>$isPrevMonth ? "none" : "auto"};
    opacity: ${({$isPrevMonth})=>$isPrevMonth ? 0 : 1};
    background-color: ${colors.white};

    span{
        font-size: 16px;
        color: ${colors.black};
        font-weight: 600;
        margin-bottom: 3px;
        display: block;
    }
`;

export default CalendarDay;