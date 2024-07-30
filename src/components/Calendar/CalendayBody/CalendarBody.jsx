import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import CalendarDaysWrapper from './CalendarDaysWrapper';
import gsap from 'gsap';

const CalendarBody = () => {
    const weeks = ["월", "화", "수", "목", "금", "토", "일"];

    const calendarBodyRef = useRef();

    useEffect(() => {
        gsap.defaults({ duration: .7, ease: 'power4.inOut' });

        gsap.to(calendarBodyRef.current, {
            delay: .3,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        })
    }, []);

    return (
        <StyledCalendarBody ref={calendarBodyRef}>
            <div className="top"></div>
            <ul className="weeks">
                {weeks.map((e, i) => {
                    return <li key={i}>{e}</li>
                })}
            </ul>
            <CalendarDaysWrapper />
        </StyledCalendarBody>

    );
};

const StyledCalendarBody = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 16px 0px #0000001A;
    margin-bottom: 51px;
    min-height: 420px;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);

    .top{
        height: 24px;
        background-color: ${colors.mainColor};
        margin-bottom: 7px;
    }

    .weeks{
        width: 100%;
        display: flex;

        li{
            flex: 1;
            font-size: 10px;
            color: #9FA4A8;
            text-align: center;
            font-weight: 500;
        }
    }
`;

export default CalendarBody;
