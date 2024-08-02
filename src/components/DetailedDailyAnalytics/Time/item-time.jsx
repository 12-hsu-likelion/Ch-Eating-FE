import React from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
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

const parseCreateTime = (createTimeStr) => {
    if (!createTimeStr || typeof createTimeStr !== 'string') {
        return new Date(0);
    }
    return new Date(createTimeStr.replace(/-/g, '/'));
};

const ItemTime = ({ time, before = [], after = [], meal = [] }) => {
    // 시간별로 나눈 배열 합치기
    const events = [
        ...before.map(item => ({ ...item, type: 'before' })),
        ...after.map(item => ({ ...item, type: 'after' })),
        ...meal.map(item => ({ ...item, type: 'meal' }))
    ];

    //console.log(time, ":", events);

    // 빠른 순으로 정렬
    const sortedEvents = events.sort((a, b) => {
        return parseCreateTime(a.createTime) - parseCreateTime(b.createTime);
    });

    const hasData = before.length > 0 || after.length > 0 || meal.length > 0;

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    return (
        <ItemContainer>
            <TimeP hasdata={hasData ? 'true' : 'false'}>{formatTime(time)}:00</TimeP>
            <ContentContainer>
                {sortedEvents.map((event, index) => {
                    switch (event.type) {
                        case 'before':
                            return <Before key={index} data={[event]} />;
                        case 'after':
                            return <After key={index} data={[event]} />;
                        case 'meal':
                            return <Meal key={index} data={[event]}/>;
                        default:
                            return null;
                    }
                })}
            </ContentContainer>
        </ItemContainer>
    );
};

export default ItemTime;
