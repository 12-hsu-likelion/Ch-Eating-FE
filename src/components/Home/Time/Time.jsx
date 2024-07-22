import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";

const TimeContainer = styled.div`
    width: 85%;
    height: 21.2rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 1.6rem;
    margin-top: 2rem;
    padding-left: 3.9rem;
`;

const TimeTitle = styled.p`
    margin-top: 3rem;
    font-size: 1rem;
    color: ${colors.gray3};
`;

const TimeP = styled.p`
    color: ${colors.subColor};
    font-size: 4.8rem;
    font-weight: 600;
`;

const TimeSub = styled.p`
    font-size: 1.4rem;
    color: ${colors.gray2};
    font-weight: 600;
`

const TestContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const TestButton = styled.button`
    width: 14.4rem;
    height: 4.8rem;
    background-color: ${colors.violet90};
    font-weight: 500;
    font-size: 1.4rem;
    color: white;
    margin-right: 2rem;
    margin-top: 2.9rem;
    border: none;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
`

const Time = () => {
    const [time, setTime] = useState('');

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const period = hours < 12 ? 'AM' : 'PM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        setTime(`${period} ${formattedHours}:${formattedMinutes}`);
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="pageContainer" style={{ display: "flex", justifyContent: "center" }}>
            <TimeContainer>
                <TimeTitle>현재 시간</TimeTitle>
                <TimeP>{time}</TimeP>
                <TimeSub>적절한 식사시간이에요!</TimeSub>

                <TestContainer>
                    <TestButton>배고픔테스트 하기</TestButton>
                </TestContainer>
            </TimeContainer>
        </div>
    );
};

export default Time;
