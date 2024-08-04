import React from 'react';
import styled from "styled-components";
import colors from "../../../../styles/colors";
import Before from "../Time/TimeDetail/Before";
import After from "../Time/TimeDetail/After";
import Meal from "../Time/TimeDetail/Meal";

const ItemContainer = styled.div`
    padding: 0.5rem;
    margin: 0.2rem 0;
    width: 100%;
    display: flex;
    margin-bottom: 2rem;
`;

const TimeP = styled.p`
    width: 10%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.hasdata === 'true' ? colors.gray6 : colors.gray4};
`;

const ContentContainer = styled.div`
    width: 90%;
    height: 100%;
    padding-left: 2%;
`;

const createFullDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) {
        return new Date(0);
    }
    const formattedDateStr = `${dateStr.replace(/-/g, '/')} ${timeStr}`;
    return new Date(formattedDateStr);
};

// 정렬을 위한 시간 비교 함수
const compareTime = (a, b) => {
    const timeA = a.createTime || a.createAtTime || '';
    const timeB = b.createTime || b.createAtTime || '';
    
    if (timeA === timeB) {
        return (a.testId || 0) - (b.testId || 0);
    }
    
    return timeA.localeCompare(timeB);
};

const ItemTime = ({ time, before = [], after = [], meal = [] }) => {
    // 시간별로 나눈 배열 합치기
    const events = [
        ...before.map(item => ({ ...item, type: 'before' })),
        ...after.map(item => ({ ...item, type: 'after' })),
        ...meal.map(item => ({ ...item, type: 'meal' }))
    ];

    events.sort(compareTime);

    console.log(time, ":", events);

    const hasData = before.length > 0 || after.length > 0 || meal.length > 0;

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    return (
        <ItemContainer>
            <TimeP hasdata={hasData ? 'true' : 'false'}>{formatTime(time)}:00</TimeP>
            <ContentContainer>
                {events.map((event, index) => {
                    switch (event.type) {
                        case 'before':
                            return <Before key={index} data={[event]} />;
                        case 'after':
                            return <After key={index} data={[event]} />;
                        case 'meal':
                            return <Meal key={index} data={[event]} />;
                        default:
                            return null;
                    }
                })}
            </ContentContainer>
        </ItemContainer>
    );
};

export default ItemTime;
