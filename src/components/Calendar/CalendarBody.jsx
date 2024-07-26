import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import CalendarDays from './CalendarDays';

const CalendarBody = () => {
    const weeks = ["월", "화", "수", "목", "금", "토", "일"];
    return (
        <StyledCalendarBody>
            <div className="top"></div>
            <ul className="weeks">
                {weeks.map((e, i)=>{
                    return <li key={i}>{e}</li>
                })}
            </ul>
            <CalendarDays />
        </StyledCalendarBody>
    );
};

const StyledCalendarBody = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 16px 0px #0000001A;

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