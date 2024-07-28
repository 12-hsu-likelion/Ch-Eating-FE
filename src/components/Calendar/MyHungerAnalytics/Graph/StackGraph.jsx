import React from 'react';
import styled from 'styled-components';
import StackBar from './StackBar';
import colors from '../../../../styles/colors';

const StackGraph = () => {
    // 데이터를 받아오면 밑의 데이터처럼 7개의 요소를 가진 배열로 가공하기
    // 하나는 가짜 배고픔을 느낀 횟수,
    // 또 하나는 가짜 배고픔에 속은 횟수임
    const weeks = ["월", "화", "수", "목", "금", "토", "일"];
    const data = [1, 2, 5, 4, 5, 0, 6];

    return (
        <StyledStackGraph>
            {weeks.map((week, i) => {
                return <StyledWeek className='dd' key={i}>
                    <div className="stack-wrapper">
                        {Array.from({ length: data[i] }).map((_, j) => {
                            return <StackBar key={j} />
                        })}
                    </div>
                    <span className='week'>{week}</span>
                </StyledWeek>
            })}
            <span className='line'></span>
        </StyledStackGraph>
    );
};

const StyledStackGraph = styled.ul`
    padding: 0 9px;
    width: 100%;
    display: flex;
    text-align: center;
    position: relative;

    .line{
        position: absolute;
        background-color: ${colors.gray3};
        height: 1.5px;
        width: 100%;
        bottom: 13px;
        left: 0;
    }
`

const StyledWeek = styled.li`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;

    .stack-wrapper{
        display: flex;
        flex-direction: column;
    }

    .week{
        color: #9FA4A8;
        margin-top: 3px;
    }
`;

export default StackGraph;