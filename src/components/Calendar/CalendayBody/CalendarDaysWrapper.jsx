import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../../context/CalendarContext';
import CalendarDay from './CalendarDay';
import { format } from 'date-fns';
import { useGetMonthData } from '../../../hooks/useAsync';
import { useNavigate } from 'react-router-dom';

const CalendarDaysWrapper = () => {
    const navigate = useNavigate();

    const {daysInMonth, currentDate} = useCalendarContext();
    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd');

    const {year, month} = currentDate;

    const [monthState, monthFetchData] = useGetMonthData(`${year}-${month}`);

    // api가 개발 완료된다면 밑에 코드 풀기
    useEffect(()=>{
        // monthFetchData();
    }, [month]);

    // 밑의 dayInfo는 통신으로 받은 day의 정보가 아님 
    // 그냥 dayInfo만 받아와서 그 페이지에서 데이터를 get 요청해도 될 듯?
    const gotoDetailedAnalyticsPage = (dayInfo) => {
        
        navigate(`/detailedanalytics/${dayInfo.date}`, {
            state: {
                dayInfo
            }
        });
    }

    if(monthState.loading){
        return <StyledLoading>로딩중...</StyledLoading>
    }

    return (
        <StyledCalendarDayWrapper>
            {daysInMonth.map((dayInfo, i)=>{
                return <CalendarDay gotoDetailedAnalyticsPage = {gotoDetailedAnalyticsPage} isCurrent = {formattedDate === dayInfo.date} isPrevMonth = {dayInfo.month !== currentDate.month} key={i} dayInfo = {dayInfo} />
            })}
        </StyledCalendarDayWrapper>
    );
};

const StyledLoading = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 20px;
`;

const StyledCalendarDayWrapper = styled.ul`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

export default CalendarDaysWrapper;