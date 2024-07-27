import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import { useCalendarContext } from '../../../context/CalendarContext';
import WeekDropDown from '../WeekDropDown';

const PeriodSelector = () => {
    const { currentSelect, dispatch } = useCalendarContext();
    const { isWeeklySelected } = currentSelect;

    return (
        <StyledPeriodSelector>
            <div className="weekly-monthly-switcher">
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected={isWeeklySelected}>주간</StyledSpan>
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected={!isWeeklySelected}>월간</StyledSpan>
            </div>

            <WeekDropDown />
        </StyledPeriodSelector>
    );
};

const StyledPeriodSelector = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .weekly-monthly-switcher{
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

export default PeriodSelector;