import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ItemDate from "./item-date";

const ListContainer = styled.div`
    width: 100%;
    height: 7.6rem;
    display: flex;
`;

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const ListDate = () => {
    const [weekDates, setWeekDates] = useState([]);
    const [formattedDates, setFormattedDates] = useState([]);

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        const dates = [];
        const formattedDates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
            formattedDates.push(formatDate(date));
        }

        setWeekDates(dates);
        setFormattedDates(formattedDates);

        console.log('Formatted Dates:');
        formattedDates.forEach(date => console.log(date));
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
                    istoday={date.toDateString() === today.toDateString()}
                    isfirst={index === 0}
                    islast={index === weekDates.length - 1}
                    formattedDates={formattedDates[index]}
                />
            ))}
        </ListContainer>
    );
};

export default ListDate;
