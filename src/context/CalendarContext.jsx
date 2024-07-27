import { createContext, useContext } from "react";
import { useCalendar } from "../hooks/useCalendar";

const CalendarContext = createContext(); 

export function CalendarProvider({ children, date }) {
    const calendar = useCalendar(date);

    return (
        <CalendarContext.Provider value={calendar}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendarContext(){
    const context = useContext(CalendarContext);

    if(!context){
        throw new Error("Can't Find Calendar Context");
    }

    return context;
}