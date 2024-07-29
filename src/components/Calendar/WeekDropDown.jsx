import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import calendar_select from "../../assets/images/calendar_select.png";
import colors from '../../styles/colors';
import { useCalendarContext } from '../../context/CalendarContext';

const WeekDropDown = () => {
    // 기본적으로 달이 변하면 달의 week도 변하기 때문에 달이 변할 때마다 현재 선택된 week도 변경
    // month의 경우는 어차피 크게 선택할 수 있기 때문에 연이 변해도, 달이 변해도 마지막으로 선택한 month(연도까지 포함된 객체)로 currentSelect가 변하지 않음
    const { currentSelect, dispatch, splitedArrayByWeek, currentDate, years} = useCalendarContext();
    // currentSelect 객체에서 현재 선택된 옵션 추출
    const { isWeeklySelected, selectedWeek, selectedMonth } = currentSelect;
    // 드롭다운 옵션 show or hidden(주간과 월간 공유 : 같이 열리고 같이 닫힘)
    const [optionIsOpen, setOptionIsOpen] = useState(false);

    // week 드롭다운의 title
    const [weekTitle, setWeekTitle] = useState(`${Number(selectedWeek[0].month)}/${Number(selectedWeek[0].day)}~${Number(selectedWeek[selectedWeek.length - 1].day)}`);

    // 선택된 주가 변경될 때마다 week 드롭다운의 title 변경
    useEffect(()=>{
        setWeekTitle(`${Number(selectedWeek[0].month)}/${Number(selectedWeek[0].day)}~${Number(selectedWeek[selectedWeek.length - 1].month)}/${Number(selectedWeek[selectedWeek.length - 1].day)}`);
    }, [selectedWeek]);

    // month 드롭다운의 title
    const [monthTitle, setMonthTitle] = useState(selectedMonth.month);

    // 선택된 월이 변경될 때마다 month 드롭다운의 title 변경
    useEffect(()=>{
        setMonthTitle(selectedMonth.month);
    }, [selectedMonth]);

    const s = useCalendarContext();
    console.log(s);

    return (
        <StyledWeekDropDown $isWeeklySelected={isWeeklySelected} onClick={()=>setOptionIsOpen(prev=>!prev)}>
            <div className="img-wrapper">
                <img src={calendar_select} alt="select" />
            </div>
            {isWeeklySelected ? (
                <>
                    {weekTitle}
                    <StyledUl $isOpen = {optionIsOpen}>
                        {splitedArrayByWeek.map((e, i)=>{
                            return <StyledLi $isCurrent = {selectedWeek[0].day === e[0].day} onClick={()=>{
                                dispatch.handleSelectWeekOfSelectedMonth(i);
                            }} key={i}>{`${Number(e[0].month)}/${Number(e[0].day)}~${Number(e[e.length - 1].month)}/${Number(e[e.length - 1].day)}`}</StyledLi>
                        })}
                    </StyledUl>
                </>
            ) : <>
                {monthTitle}
                <StyledUl $isOpen = {optionIsOpen}>
                    {years.map((e, i)=>{
                        return <StyledLi $isCurrent = {selectedMonth.month === e.month} onClick={()=>{
                            dispatch.handleSelectMonthOfCurrentYear(i);
                        }} key={i}>{e.month}</StyledLi>
                    })}
                </StyledUl>
            </>}
        </StyledWeekDropDown>
    );
};

const StyledWeekDropDown = styled.div`
    position: relative;
    color: ${colors.gray6};
    background-color: ${colors.gray2};
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: ${({ $isWeeklySelected }) => $isWeeklySelected ? "13px" : "29px"};
    cursor: pointer;
    padding: 5px 28px 5px 13px;

    .img-wrapper{
        pointer-events: none;
        position: absolute;
        width: 12px;
        right: 10px;
        top: 50%;
        transform: translateY(-40%);
    }
`;

const StyledUl = styled.ul`
    display: ${({$isOpen})=>$isOpen ? "block" : "none"};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    color: ${colors.gray6};
    background-color: ${colors.gray2};
    z-index: 50;

    li{
        text-align: center;
        padding: 2.5px 0;
    }
`;

const StyledLi = styled.li`
    text-align: center;
    white-space: nowrap;
    background-color: ${({$isCurrent})=>$isCurrent ? "#C7C8CC" : colors.gray2};
`;

export default WeekDropDown;