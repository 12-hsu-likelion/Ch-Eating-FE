import React from 'react';
import { useCalendarContext } from '../../../context/CalendarContext';
import styled from 'styled-components';
import Daily from './Daily';
import Weekly from './Weekly';

const AnalyticsWrapper = () => {
    // 모든 데이터 fetch는 여기서
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