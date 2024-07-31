import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ItemDate from "./item-date";

const ListContainer = styled.div`
    width: 100%;
    height: 7.6rem;
    display: flex;
`

const ListDate = () => {
    const [weekDates, setWeekDates] = useState([]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }

        setWeekDates(dates);
    }, []);

    const day = ['월', '화', '수', '목', '금', '토', '일'];
    const today = new Date();

    return (
        <ListContainer>
            {weekDates.map((date, index) => (
                <ItemDate 
                    key={index} 
                    date={date} 
                    day={day[index]}
                    isToday={date.toDateString() === today.toDateString()}
                    isFirst={index === 0}
                    isLast={index === weekDates.length - 1}
                    istoday={date.toDateString() === today.toDateString()}
                    isfirst={index === 0}
                    islast={index === weekDates.length - 1}
                />
            ))}
        </ListContainer>
    )
}
export default ListDate;