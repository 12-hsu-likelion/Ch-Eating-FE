import React from 'react';
import styled from 'styled-components';
import PeriodSelector from './PeriodSelector';
import HungerAnalytics from './HungerAnalytics';

const CalendarBottom = () => {

    return (
        <StyledCalendarBottom>
            <PeriodSelector />
            <HungerAnalytics />
        </StyledCalendarBottom>
    );
};

const StyledCalendarBottom = styled.div`
    margin-bottom: 80px;
`;

export default CalendarBottom;