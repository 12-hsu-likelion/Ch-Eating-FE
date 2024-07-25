import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

const BeforeLastAnswer = ({ beforeAnswer, setBeforeAnswer }) => {
    const ar = [1, 2, 3, 4, 5];

    return (
        <StyledBeforeLastAnswer>
            <div className='level'>
                <span>그렇지 않다</span>
                <span>매우 그렇다</span>
            </div>

            <div className="rate">
                {ar.map((e, i) => {
                    return <StyledSpan onClick={() => {
                        setBeforeAnswer(prev => ({
                            ...prev,
                            answer: {
                                ...prev.answer,
                                [5]: e
                            }
                        }))
                    }} key={i} $isSelected = {beforeAnswer.answer[5] === e} />
                })}
            </div>
        </StyledBeforeLastAnswer>
    );
};

const StyledBeforeLastAnswer = styled.div`
    margin-top: -16px;
    width: 308px;

    .level{
        display: flex;
        width: 100%;
        justify-content: space-between;
        color: ${colors.gray5};
        font-size: 12px;
        margin-bottom: 8px;
    }

    .rate{
        width: 100%;
        display: flex;
        justify-content: space-between;

        span{
            border-radius: 50%;
            width: 36px;
            aspect-ratio: 1/1;
            background-color: ${colors.violet10};
            cursor: pointer;
        }
    }
`;

const StyledSpan = styled.span`
    border-radius: 50%;
    width: 36px;
    aspect-ratio: 1/1;
    background-color: ${colors.violet10};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props =>
    props.$isSelected &&
    css`
        &::after{
            content: "";
            width: 22px;
            border-radius: 50%;
            aspect-ratio: 1/1;
            background-color: ${colors.mainColor};
        }
    `}
`;

export default BeforeLastAnswer;