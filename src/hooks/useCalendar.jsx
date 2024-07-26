import {
    addMonths,
    addYears,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    subMonths,
    subYears,
    getDay,
} from 'date-fns';
import { useState } from 'react';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentYear, currentMonth, currentDay] = format(currentDate, "yyyy-MM-dd").split("-");

    const startCurrentMonth = startOfMonth(currentDate);
    const endCurrentMonth = endOfMonth(currentDate);

    const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
    const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

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

    return {
        currentDate: {
            year: currentYear,
            month: currentMonth,
            day: currentDay
        },
        daysInMonth,
        dispatch: {
            handlePrevMonth,
            handleNextMonth
        }
    };
};
