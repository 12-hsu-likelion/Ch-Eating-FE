import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    subMonths,
    getDay,
    differenceInWeeks,
} from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useCalendar = (date) => {
    // 같은 context로 묶을 수 없으니 date를 설정하도록
    const [currentDate, setCurrentDate] = useState(date);
    const [currentYear, currentMonth, currentDay] = format(currentDate, "yyyy-MM-dd").split("-");

    const startCurrentMonth = startOfMonth(currentDate);
    const endCurrentMonth = endOfMonth(currentDate);

    const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 1 });

    // 현재 날짜의 주차 구하기(현재 월을 기준으로)
    const [currentWeek, setCurrentWeek] = useState(differenceInWeeks(currentDate, startOfFirstWeek));

    // 현재 월에 포함되어 있는 모든 날짜 구하기(이전 월도 포함해서)
    const daysInMonth = eachDayOfInterval({
        start: startOfFirstWeek,
        end: endOfLastWeek
    }).map((day) => ({
        date: format(day, "yyyy-MM-dd"),
        year: format(day, "yyyy"),
        month: format(day, "MM"),
        day: format(day, "dd"),
        dayIndexOfWeek: getDay(day),
    }));

    // 주차 별 배열 구하기
    const splitByWeek = useCallback(() => {
        const result = [];

        for (let i = 0; i < daysInMonth.length; i += 7) {
            result.push(daysInMonth.slice(i, i + 7));
        }

        return result;
    }, [daysInMonth]);

    // 주차 별로 나뉘어져 있는 배열 useMemo가 없다면 selectedWeek를 계산하는 useEffect가 무한 루프에 빠짐!!!!!
    const splitedArrayByWeek = useMemo(() => splitByWeek(), [currentMonth]);

    const [isWeeklySelected, setIsWeeklySelected] = useState(true);

    const isInitialRender = useRef(true);
    const [selectedWeek, setSelectedWeek] = useState(splitedArrayByWeek[currentWeek]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        setSelectedWeek(splitedArrayByWeek[0]);
    }, [splitedArrayByWeek]);

    // useEffect(() => {
    //     console.log("선택된 주차:");
    //     console.log(selectedWeek);
    // }, [selectedWeek]);

    // 연도와 월을 담고 있는 배열
    const years = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            year: currentYear,
            month: `${i + 1}월`
        }))
    }, [currentYear]);

    // useEffect(()=>{
    //     console.log("연도 객체가 바뀜")
    // }, [years]);

    const [selectedMonth, setSelectedMonth] = useState(years[Number(currentMonth) - 1]);

    const handlePrevMonth = () => {
        setCurrentDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    // 주별, 월별 선택하는 함수
    const handleSelectWeeklyOrMonthly = () => {
        setIsWeeklySelected(prev => !prev);
    }

    // 선택한 월의 조회하고자 하는 주차를 선택하는 함수
    const handleSelectWeekOfSelectedMonth = (indexOfWeek) => {
        setSelectedWeek(splitedArrayByWeek[indexOfWeek]);
    }

    const handleSelectMonthOfCurrentYear = (indexOfMonth) => {
        setSelectedMonth(years[indexOfMonth]);
    }

    return {
        currentDate: {
            year: currentYear,
            month: currentMonth,
            week: currentWeek,
            day: currentDay,
        },
        dispatch: {
            handlePrevMonth,
            handleNextMonth,
            handleSelectWeeklyOrMonthly,
            handleSelectWeekOfSelectedMonth,
            handleSelectMonthOfCurrentYear
        },
        currentSelect: {
            isWeeklySelected,
            selectedWeek,
            selectedMonth
        },
        // 선택한 월을 1주차~마지막주차까지 나누어져 있는 배열
        splitedArrayByWeek,
        // 현재 월의 모든 일을 담은 배열
        daysInMonth,
        // 현재 년도의 모든 월을 담은 객체
        years
    };
};
