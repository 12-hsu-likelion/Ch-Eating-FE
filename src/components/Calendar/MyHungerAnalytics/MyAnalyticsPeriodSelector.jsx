import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import { useCalendarContext } from '../../../context/CalendarContext';
import WeekDropDown from '../WeekDropDown';

const MyAnalyticsPeriodSelector = () => {
    const { currentSelect, dispatch } = useCalendarContext();
    const {isDailySelected} = currentSelect;

    const s = useCalendarContext();

    console.log(s);

    return (
        <StyledPeriodSelector>
            <div className="daily-weekly-switcher">
                <StyledSpan onClick={dispatch.handleSelectDailyOrWeekly} $isSelected = {isDailySelected}>일간</StyledSpan>
                <StyledSpan onClick={dispatch.handleSelectDailyOrWeekly} $isSelected = {!isDailySelected}>주간</StyledSpan>
            </div>

            {!isDailySelected && (
                <WeekDropDown />
            )}
        </StyledPeriodSelector>
    );
};

const StyledPeriodSelector = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

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