import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../../styles/colors';
import CalendarTestBar from './CalendarTestBar';

const CalendarDay = ({ data, gotoDetailedAnalyticsPage, dayInfo, isPrevMonth, isCurrent }) => {
    const { date, year, month, day, dayIndexOfWeek } = dayInfo;
    // 정보 객체 받아와서 fake인지 아닌지 확인하기

    const isFakeHunger = data?.map(e => e.testResult === "가짜 배고픔" ? true : false);

    return (
        <StyledCalendarDay onClick={() => gotoDetailedAnalyticsPage(dayInfo)} $isCurrent={isCurrent} $isPrevMonth={isPrevMonth}>
            <span>
                {Number(day)}
            </span>
            {isFakeHunger && isFakeHunger.map((isFake, i) => {
                return <CalendarTestBar key={i} isFakeHunger={isFake} />
            })}

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

    ${({ $isCurrent }) =>
        !$isCurrent && css`
            &:hover{
            background-color: #dedbe0;
            }
        `}

    pointer-events: ${({ $isPrevMonth }) => $isPrevMonth ? "none" : "auto"};
    opacity: ${({ $isPrevMonth }) => $isPrevMonth ? 0 : 1};
    background-color: ${({ $isCurrent }) => $isCurrent ? colors.violet10 : colors.white};

    span{
        font-size: 16px;
        color: ${colors.black};
        font-weight: 600;
        margin-bottom: 3px;
        display: block;
    }
`;

export default CalendarDay;