import React, { useMemo } from 'react';
import styled from 'styled-components';
import HungerAnalyticsBox from './HungerAnalyticsBox';
import { useCalendarContext } from '../../../context/CalendarContext';
import { useGetMonthlyFakeHungerStats, useGetWeeklyFakeHungerStats } from '../../../hooks/useAsync';

const HungerAnalytics = () => {
    // 주간과 월간으로 나눠짐
    // 뽑아내야 할 건 currentSelect의 seletedMonth와 selectedWeek임
    const { currentSelect } = useCalendarContext();
    const { selectedWeek, selectedMonth } = currentSelect;

    const startDate = useMemo(() => {
        return selectedWeek[0].date;
    }, [selectedWeek]);

    const endDate = useMemo(() => {
        return selectedWeek[6].date;
    }, [selectedWeek]);

    const [weekHungerStatsState, getWeeklyFakeHungerStats] = useGetWeeklyFakeHungerStats(startDate, endDate, selectedWeek);
    const [monthHungerStatsState, getMonthlyFakeHungerStats] = useGetMonthlyFakeHungerStats(Number(selectedMonth.year), Number(selectedMonth.month.split(/[^0-9]/)[0]), selectedMonth);

        // 주간 로딩, 데이터, 에러 처리
        if (weekHungerStatsState.loading) {
            weekHungerStatsState.data = "로딩중...";
        }
        else if(weekHungerStatsState.error){
            weekHungerStatsState.data = "ERROR";
        }
        else {
            weekHungerStatsState.data = "주간 데이터"
        }
        
        // 월간 로딩, 데이터, 에러 처리
        if (monthHungerStatsState.loading) {
            monthHungerStatsState.data = "로딩중..."
        }
        else if(monthHungerStatsState.error){
            monthHungerStatsState.data = "ERROR"
        }
        else {
            monthHungerStatsState.data = "월간 데이터"
        }


        // 밑의 데이터는 data.어쩌고로 3개 다 따로 넣어야함
    return (
        <StyledHungerAnalytics>
            <HungerAnalyticsBox data={currentSelect.isWeeklySelected ? weekHungerStatsState.data : monthHungerStatsState.data} type={"가짜 배고픔을\n많이 느낀 요일"} />
            <HungerAnalyticsBox data={currentSelect.isWeeklySelected ? weekHungerStatsState.data : monthHungerStatsState.data} type={"가짜 배고픔을\n많이 느낀 시간"} />
            <HungerAnalyticsBox data={currentSelect.isWeeklySelected ? weekHungerStatsState.data : monthHungerStatsState.data} type={"가짜 배고픔을\n이겨낸 횟수"} />
        </StyledHungerAnalytics>
    );
};

const StyledHungerAnalytics = styled.ul`
    display: flex;
    gap: 8px;
    margin-bottom: 39px;
`;

export default HungerAnalytics;