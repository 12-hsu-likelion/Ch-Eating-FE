import React from 'react';
import styled from 'styled-components';
import StackGraph from './Graph/StackGraph';
import colors from '../../../styles/colors';

const Daily = () => {
    return (
        <StyledDaily>
            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔을 느낀 횟수</h2>
                <StackGraph />
            </div>

            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔에 속은 횟수</h2>
                <StackGraph />
            </div>
        </StyledDaily>
    );
};

const StyledDaily = styled.div`

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

export default Daily;