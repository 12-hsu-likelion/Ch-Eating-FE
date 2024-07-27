import React from 'react';
import styled from 'styled-components';
import HungerAnalyticsBox from './HungerAnalyticsBox';

const HungerAnalytics = () => {
    return (
        <StyledHungerAnalytics>
            <HungerAnalyticsBox type = {"가짜 배고픔을\n많이 느낀 요일"} />
            <HungerAnalyticsBox type = {"가짜 배고픔을\n많이 느낀 시간"} />
            <HungerAnalyticsBox type = {"가짜 배고픔을\n이겨낸 횟수"} />
        </StyledHungerAnalytics>
    );
};

const StyledHungerAnalytics = styled.ul`
    display: flex;
    gap: 8px;
    margin-bottom: 39px;
`;

export default HungerAnalytics;