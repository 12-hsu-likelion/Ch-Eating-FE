import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import CalendarTestBar from './CalendarTestBar';

const CalendarDay = ({ data, gotoDetailedAnalyticsPage, dayInfo, isPrevMonth, isCurrent }) => {
    const { date, year, month, day, dayIndexOfWeek } = dayInfo;
    // 정보 객체 받아와서 fake인지 아닌지 확인하기

    const beforeTests = data?.beforeTests ?? [];
    const afterTests = data?.afterTests ?? [];

    const allTests = [...beforeTests, ...afterTests];

    const isFakeHunger = allTests.length > 0
        ? allTests.map(test => test.result === "FAKE_HUNGER")
        : [];

    return (
        <StyledCalendarDay onClick={() => gotoDetailedAnalyticsPage(dayInfo)} $isCurrent={isCurrent} $isPrevMonth={isPrevMonth}>
            <span>
                {Number(day)}
            </span>
            {isFakeHunger.length > 0 && isFakeHunger.map((isFake, index) => (
                <CalendarTestBar key={index} isFakeHunger={isFake} />
            ))}

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