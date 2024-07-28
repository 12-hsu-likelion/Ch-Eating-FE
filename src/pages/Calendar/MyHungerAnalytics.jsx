import React from 'react';
import styled from 'styled-components';
import { CalendarProvider } from '../../context/CalendarContext';
import { useLocation } from 'react-router-dom';
import colors from '../../styles/colors';
import MyAnalyticsPeriodSelector from '../../components/Calendar/MyHungerAnalytics/MyAnalyticsPeriodSelector';
import AnalyticsWrapper from '../../components/Calendar/MyHungerAnalytics/AnalyticsWrapper';

const MyHungerAnalytics = () => {
    const location = useLocation();
    const date = location.state.sendData;

    return (
        <CalendarProvider date = {new Date(date)}>
            <StyledMyHungerAnalytics className='pageContainer'>
                <div className="my-hunger-analytics-wrapper">
                    <div className="title">
                        <span>나의 통계</span>
                        <h2>통계를 통해 변화를 확인하세요.</h2>
                    </div>

                    <MyAnalyticsPeriodSelector />
                    <AnalyticsWrapper />
                </div>
            </StyledMyHungerAnalytics>
        </CalendarProvider>
    );
};

const StyledMyHungerAnalytics = styled.section`
    .my-hunger-analytics-wrapper{
        margin: 57px 16px 0 16px;

        .title{
            margin-bottom: 61px;
            
            span{
                display: block;
                font-size: 12px;
                color: ${colors.gray5};
                margin-bottom: 8px;
            }

            h2{
                color: ${colors.black};
                font-weight: 600;
                font-size: 16px;
            }
        }
    }
`

export default MyHungerAnalytics;