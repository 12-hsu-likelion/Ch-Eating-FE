import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import CalendarHeader from '../../components/Calendar/CalendarHeader/CalendarHeader';
import { CalendarProvider } from "../../context/CalendarContext";
import CalendarBody from '../../components/Calendar/CalendayBody/CalendarBody';
import CalendarBottom from '../../components/Calendar/CalendarBottom/CalendarBottom';

const Calender = () => {
    const [date, setDate] = useState(new Date());

    return (
        <CalendarProvider date = {date}>
            <StyledCalendar className='pageContainer'>
                <div className="calendar-wrapper">
                    <div className="title">
                        캘린더
                    </div>
                    <CalendarHeader />
                    <CalendarBody />
                    <CalendarBottom />
                </div>
            </StyledCalendar>
        </CalendarProvider>
    );
};

const StyledCalendar = styled.section`
    overflow: auto;

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