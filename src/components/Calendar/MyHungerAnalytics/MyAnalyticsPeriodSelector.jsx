import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import { useCalendarContext } from '../../../context/CalendarContext';
import WeekDropDown from '../WeekDropDown';

const MyAnalyticsPeriodSelector = () => {
    const { currentSelect, dispatch } = useCalendarContext();
    const {isWeeklySelected, selectedWeek} = currentSelect;

    useEffect(()=>{
        // 여기에 밑의 데이터를 fetch하는 함수 작성
    }, [selectedWeek]);

    return (
        <StyledPeriodSelector>
            <div className="daily-weekly-switcher">
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected = {isWeeklySelected}>일간</StyledSpan>
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected = {!isWeeklySelected}>주간</StyledSpan>
            </div>

            <WeekDropDown />

        </StyledPeriodSelector>
    );
};

const StyledPeriodSelector = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 37px;

    .daily-weekly-switcher{
        display: flex;
        border-radius: 21px;
        background-color: ${colors.gray2};
    }
`;

const StyledSpan = styled.span`
    cursor: pointer;
    font-size: 12px;
    border-radius: 21px;
    background-color: ${({ $isSelected }) => $isSelected ? colors.mainColor : colors.gray2};
    z-index: ${({ $isSelected }) => $isSelected ? 2 : 1};
    color: ${({ $isSelected }) => $isSelected ? colors.gray1 : colors.gray3};
    pointer-events: ${({ $isSelected }) => $isSelected ? "none" : "auto"};
    padding: 5px 11px;

    &:first-child{
        margin-right: -10px;
    }
`;

export default MyAnalyticsPeriodSelector;