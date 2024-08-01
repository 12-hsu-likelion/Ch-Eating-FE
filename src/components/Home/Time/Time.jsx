import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import colors from "../../../styles/colors";

const TimeContainer = styled.div`
    width: 85%;
    height: 21.2rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 1.6rem;
    margin-top: 2rem;
    padding: 0 2.3rem;
`;

const TimeTitle = styled.p`
    margin-top: 3rem;
    font-size: 1rem;
    color: ${colors.gray3};
`;

const TimeP = styled.p`
    color: ${({ color }) => color || colors.black};
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
    const [timeColor, setTimeColor] = useState(colors.black);
    const [timeMessage, setTimeMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const period = hours < 12 ? 'AM' : 'PM';
            const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            setTime(`${period} ${formattedHours}:${formattedMinutes}`);

            let color = colors.black;
            let message = '적절한 식사시간이 아니에요.';

            if ((hours >= 7 && hours < 9) || (hours === 9 && minutes === 0) ||
                (hours >= 12 && hours < 14) || (hours === 14 && minutes === 0) ||
                (hours >= 18 && hours < 20) || (hours === 20 && minutes === 0)) {
                color = colors.subColor;
                message = '이상적인 식사시간이에요!';
            } else if ((hours >= 21 && hours < 24) || (hours === 0 && minutes === 0) ||
                (hours >= 0 && hours < 1) || (hours === 1 && minutes === 0)) {
                color = colors.error;
                message = '야식 위험시간이에요!';
            } else {
                color = colors.black;
                message = '적절한 식사시간이 아니에요.';
            }

            setTimeColor(color);
            setTimeMessage(message);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleTestButtonClick = () => {
        navigate('/test');
    };

    return (
        <div className="pageContainer" style={{ display: "flex", justifyContent: "center" }}>
            <TimeContainer>
                <TimeTitle>현재 시간</TimeTitle>
                <TimeP color={timeColor}>{time}</TimeP>
                <TimeSub color={timeColor}>{timeMessage}</TimeSub>

                <TestContainer>
                    <TestButton onClick={handleTestButtonClick}>배고픔테스트 하기</TestButton>
                </TestContainer>
            </TimeContainer>
        </div>
    );
};

export default Time;
