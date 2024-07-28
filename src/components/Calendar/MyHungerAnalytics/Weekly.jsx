import React from 'react';
import styled from 'styled-components';
import StackGraph from './Graph/StackGraph';
import colors from '../../../styles/colors';

const Weekly = () => {
    return (
        <StyledWeekly>
            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔을 느낀 횟수</h2>
            </div>

            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔에 속은 횟수</h2>
            </div>
        </StyledWeekly>
    );
};

const StyledWeekly = styled.div`
    .stack-graph-wrapper{
        margin-bottom: 60px;

        h2{
            margin-bottom: 33px;
            font-weight: 400;
            font-size: 14px;
            color: ${colors.black};
        }
    }
`

export default Weekly;