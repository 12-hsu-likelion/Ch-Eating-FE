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
} from 'date-fns';
import { useState } from 'react';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isWeeklySelected, setIsWeeklySelected] = useState(true);
    const [currentYear, currentMonth, currentDay] = format(currentDate, "yyyy-MM-dd").split("-");

    const startCurrentMonth = startOfMonth(currentDate);
    const endCurrentMonth = endOfMonth(currentDate);

    const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 1 });

    console.log(endOfLastWeek);

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

    const handlePrevMonth = () => {
        setCurrentDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    const handleSelectWeeklyOrMonthly = () => {
        setIsWeeklySelected(prev=>!prev);
    }

    return {
        currentDate: {
            year: currentYear,
            month: currentMonth,
            day: currentDay
        },
        daysInMonth,
        dispatch: {
            handlePrevMonth,
            handleNextMonth,
            handleSelectWeeklyOrMonthly
        },
        currentSelect:{
            isWeeklySelected,
        }
    };
};
