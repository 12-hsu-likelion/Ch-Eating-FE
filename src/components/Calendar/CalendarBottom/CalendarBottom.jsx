import React, { useEffect } from 'react';
import styled from 'styled-components';
import PeriodSelector from './PeriodSelector';
import { useCalendarContext } from '../../../context/CalendarContext';

const CalendarBottom = () => {

    const s = useCalendarContext();

    useEffect(()=>{
        console.log(s)
    }, [s]);

    return (
        <StyledCalendarBottom>
            <PeriodSelector />
        </StyledCalendarBottom>
    );
};

const StyledCalendarBottom = styled.div`
    
`;

export default CalendarBottom;