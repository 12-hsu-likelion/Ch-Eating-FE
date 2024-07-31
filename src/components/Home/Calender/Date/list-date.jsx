import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ItemDate from './item-date';
import { useCalendarContext } from '../../../../context/CalendarContext';

const ListContainer = styled.div`
    width: 100%;
    height: 7.6rem;
    display: flex;
`;

const ListDate = () => {
    const {currentSelect} = useCalendarContext();
    const {selectedWeek} = currentSelect;
    const [weekDates, setWeekDates] = useState([]);
    const [weekData, setWeekData] = useState({});

    const startDate = selectedWeek[0].date;
    const endDate = selectedWeek[6].date;

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

        dates.sort((a, b) => a - b);

        setWeekDates(dates);

        const fetchData = async () => {
            try {
                const dataPromises = dates.map(date => {
                    const formattedDate = date.toISOString().slice(0, 10);
                    return axios.post('https://jsonplaceholder.typicode.com/users', { date: formattedDate })
                        .then(response => ({ date: formattedDate, data: response.data }));
                });

                const results = await Promise.all(dataPromises);
                const dataMap = results.reduce((acc, { date, data }) => {
                    acc[date] = data;
                    return acc;
                }, {});

                console.log("Data:", dataMap);

                setWeekData(dataMap);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
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
                    weekData={weekData[date.toISOString().slice(0, 10)]}
                />
            ))}
        </ListContainer>
    );
}

export default ListDate;