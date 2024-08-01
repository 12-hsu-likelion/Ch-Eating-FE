import React, { useMemo } from 'react';
import styled from 'styled-components';
import HungerAnalyticsBox from './HungerAnalyticsBox';
import { useCalendarContext } from '../../../context/CalendarContext';
import { useGetMonthlyFakeHungerStats, useGetWeeklyFakeHungerStats } from '../../../hooks/useAsync';

const HungerAnalytics = () => {
    // 주간과 월간으로 나눠짐
    // 뽑아내야 할 건 currentSelect의 seletedMonth와 selectedWeek임
    const { currentSelect } = useCalendarContext();
    const { isWeeklySelected, selectedWeek, selectedMonth } = currentSelect;

    const startDate = useMemo(() => {
        return selectedWeek[0].date;
    }, [selectedWeek]);

    const endDate = useMemo(() => {
        return selectedWeek[6].date;
    }, [selectedWeek]);

    const [weekHungerStatsState, getWeeklyFakeHungerStats] = useGetWeeklyFakeHungerStats(startDate, endDate, selectedWeek);
    const [monthHungerStatsState, getMonthlyFakeHungerStats] = useGetMonthlyFakeHungerStats(Number(selectedMonth.year), Number(selectedMonth.month.split(/[^0-9]/)[0]), selectedMonth);


    // console.log(weekHungerStatsState.loading, "데이터: ", weekHungerStatsState.data?.data)

    // 밑의 데이터는 data.어쩌고로 3개 다 따로 넣어야함
    return (
        <StyledHungerAnalytics>
            <HungerAnalyticsBox data={isWeeklySelected ? weekHungerStatsState.data?.data?.mostCommonDayForFakeHunger : monthHungerStatsState.data?.data?.mostCommonDayForFakeHunger} type={"가짜 배고픔을\n많이 느낀 요일"} />
            <HungerAnalyticsBox data={isWeeklySelected ? weekHungerStatsState.data?.data?.mostCommonHourForFakeHunger : monthHungerStatsState.data?.data?.mostCommonHourForFakeHunger} type={"가짜 배고픔을\n많이 느낀 시간"} />
            <HungerAnalyticsBox data={isWeeklySelected ? weekHungerStatsState.data?.data?.totalWins : monthHungerStatsState.data?.data?.totalWins} type={"가짜 배고픔을\n이겨낸 횟수"} />
        </StyledHungerAnalytics>
    );
};

const StyledHungerAnalytics = styled.ul`
    display: flex;
    gap: 8px;
    margin-bottom: 39px;
`;

export default HungerAnalytics;