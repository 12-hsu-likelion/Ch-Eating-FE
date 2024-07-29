import React from 'react';
import styled from 'styled-components';
import StackGraph from './Graph/StackGraph';
import colors from '../../../styles/colors';
import PieGraph from './Graph/PieGraph';

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

            <div className="pie-graph-wrapper">
                <h2>가짜 배고픔을 느낀 시간대</h2>
                <div className="pie-graph-with-hours">
                    <PieGraph type={"weekly"} />
                    <span className='time time-24'>24</span>
                    <span className='time time-6'>6</span>
                    <span className='time time-12'>12</span>
                    <span className='time time-18'>18</span>
                </div>
            </div>
        </StyledDaily>
    );
};

const StyledDaily = styled.div`

    h2{
        margin-bottom: 33px;
        font-weight: 400;
        font-size: 14px;
        color: ${colors.black};
    }

    .stack-graph-wrapper{
        margin-bottom: 60px;
    }

    .pie-graph-wrapper{
        margin-bottom: 100px;

        .pie-graph-with-hours{
            width: 220px;
            aspect-ratio: 1/1;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            .time{
                position: absolute;
                color: ${colors.gray5};
                font-size: 12px;
            }

            .time-24{
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-6{
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }

            .time-12{
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-18{
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

`;

export default Daily;