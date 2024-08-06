import React from 'react';
import styled from 'styled-components';
import prev from "../../../assets/images/month_prev.png";
import next from "../../../assets/images/month_next.png";
import { useCalendarContext } from '../../../context/CalendarContext';
import colors from '../../../styles/colors';

const CalendarHeader = () => {
    const { currentDate, dispatch } = useCalendarContext();

    return (
        <StyledCalendarHeader>
            <div className="month-nav-btn-wrapper" onClick={dispatch.handlePrevMonth}>
                <img src={prev} alt="prev" />
            </div>
            <h2>{Number(currentDate.year)}년 {Number(currentDate.month)}월</h2>
            <div className="month-nav-btn-wrapper" onClick={dispatch.handleNextMonth}>
                <img src={next} alt="next" />
            </div>
        </StyledCalendarHeader>
    );
};

const StyledCalendarHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;

    .month-nav-btn-wrapper{
        cursor: pointer;    
        width: 12px;
        height: 12px;
    }

    h2{
        font-size: 2rem;
        font-weight: 600;
        color: ${colors.mainColor};
    }
`;

export default CalendarHeader;