import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const HungerAnalyticsBox = ({type, data = "데이터"}) => {
    
    return (
        <StyledHungerAnalyticsBox>
            <div className="analytics-type">
                {type}
            </div>
            <span>{data}</span>
        </StyledHungerAnalyticsBox>
    );
};

const StyledHungerAnalyticsBox = styled.li`
    flex: 1;
    min-height: 168px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 29px;
    border-radius: 4px;
    border: .5px solid ${colors.gray2};
    background-color: ${colors.gray1};

    .analytics-type{
        margin-top: 53px;
        margin-bottom: 14px;
        width: max-content;
        white-space: pre-wrap;
        font-size: 12px;
        color: ${colors.gray6};
    }

    span{
        font-size: 16px;
        color: ${colors.mainColor};
        font-weight: 600;
    }
`

export default HungerAnalyticsBox;