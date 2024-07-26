import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import { useCalendarContext } from '../../../context/CalendarContext';
import SelectWeek from './SelectWeek';
import calendar_select from "../../../assets/images/calendar_select.png";

const PeriodSelector = () => {
    const { currentDate, currentSelect, dispatch, splitedArrayByWeek } = useCalendarContext();
    const { week } = currentDate;
    const { isWeeklySelected, selectedWeek } = currentSelect;


    const [weekTitle, setWeekTitle] = useState(`${Number(splitedArrayByWeek[week - 1][0].month)}/${Number(splitedArrayByWeek[week - 1][0].day)}~${Number(splitedArrayByWeek[week - 1][splitedArrayByWeek[week - 1].length - 1].day)}`)

    return (
        <StyledPeriodSelector>
            <div className="weekly-monthly-switcher">
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected={isWeeklySelected}>주간</StyledSpan>
                <StyledSpan onClick={dispatch.handleSelectWeeklyOrMonthly} $isSelected={!isWeeklySelected}>월간</StyledSpan>
            </div>

            <StyledDropDown $isWeeklySelected = {isWeeklySelected}>
                <div className="img-wrapper">
                    <img src={calendar_select} alt="select" />
                </div>
                {isWeeklySelected ? (
                    <>
                        {weekTitle}
                        <ul>여기 밑에는 주 별 li들</ul>
                    </>
                ) : <>
                    7월
                    <ul>여기 밑에는 월 별 li들</ul>
                </>}
            </StyledDropDown>
        </StyledPeriodSelector>
    );
};

const StyledPeriodSelector = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

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

const StyledDropDown = styled.div`
    position: relative;
    color: ${colors.gray6};
    background-color: ${colors.gray2};
    border-radius: 4px;
    width: 80px;
    display: flex;
    align-items: center;
    padding-left: ${({$isWeeklySelected})=>$isWeeklySelected ? "13px" : "29px"};
    cursor: pointer;

    .img-wrapper{
        pointer-events: none;
        position: absolute;
        width: 12px;
        right: 10px;
        top: 50%;
        transform: translateY(-40%);
    }

    ul{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        color: ${colors.gray6};
        background-color: ${colors.gray2};
    }
`

export default PeriodSelector;