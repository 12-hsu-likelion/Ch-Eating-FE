import React from 'react';
import { useCalendarContext } from '../../../context/CalendarContext';
import styled from 'styled-components';
import Daily from './Daily';
import Weekly from './Weekly';

const AnalyticsWrapper = () => {
    const {currentSelect} = useCalendarContext();
    
    return (
        <StyledAnalyticsWrapper>
            {currentSelect.isWeeklySelected ? (
                <Daily />
            ) : (
                <Weekly />
            )}
        </StyledAnalyticsWrapper>
    );
};

const StyledAnalyticsWrapper = styled.div`
    
`;

export default AnalyticsWrapper;