import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import { useCalendarContext } from "../../context/CalendarContext";
import CalendarBody from '../../components/Calendar/CalendarBody';

const Calender = () => {
    const s = useCalendarContext();

    useEffect(()=>{
        console.log(s);
    }, [s]);

    return (
        <StyledCalendar className='pageContainer'>
            <div className="calendar-wrapper">
                <div className="title">
                    캘린더
                </div>
                <CalendarHeader />
                <CalendarBody />
            </div>
        </StyledCalendar>
    );
};

const StyledCalendar = styled.section`

    .calendar-wrapper{
        margin: 57px 16px 0 16px;

        .title{
            color: ${colors.gray6};
            font-size: 12px;
            margin-bottom: 16px;
        }
    }
`;

export default Calender;