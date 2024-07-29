import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Bar from './Bar';

const BarGraph = ({weekChunks, data}) => {

    const max = Math.max(...data);

    return (
        <StyledBarGraph>
            {weekChunks.map((e, i) => {
                return <li key={i}>
                    <Bar max = {max} data = {data[i]} />
                    <span>{`${e[0]}~${e[e.length - 1]}`}</span>
                </li>
            })}
            <span className='line'></span>
        </StyledBarGraph>
    );
};

const StyledBarGraph = styled.ul`
    display: flex;
    position: relative;
    min-height: 46px;

    li{
        position: relative;
        flex: 1;
        text-align: center;
        color: #9FA4A8;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    >span{
        position: absolute;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
        height: 1px;
        background-color: #CACDD2;
        bottom: 11.5px;
    }
`;

export default BarGraph;
