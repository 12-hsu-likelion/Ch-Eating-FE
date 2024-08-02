import React from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import ItemTime from "./item-time";

const ListContainer = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.1rem;
    position: relative;
`;

const ListBar = styled.div`
    width: 0.1rem;
    height: 100%;
    position: absolute;
    background-color: ${colors.gray3};
    margin-left: 13%;
`;

// 시간 부분만 빼기
/* const extractHour = (createTime) => {
    if (!createTime) {
        return null;
    }

    const formattedTime = createTime.replace(/-/g, '/');
    const date = new Date(formattedTime);

    console.log(`createAtTime: ${createTime}`);
    return date.getHours();
}; 

const extractHourFromMeal = (createTime) => {
    if (!createTime) {
        return null;
    }

    const [hours, minutes, seconds] = createTime.split(':');

    //console.log(`createAtTime: ${createTime}, Hour: ${hours}`);
    return parseInt(hours, 10);
}; */

// 시간 부분만 빼기 (date 문자열에서 시간 추출)
const extractHour = (createTime) => {
    if (!createTime) {
        return null;
    }

    // ISO 8601 포맷으로 변환하여 처리
    const formattedTime = createTime.replace(/-/g, '/').replace(/T/, ' ').replace(/Z$/, '');
    const date = new Date(formattedTime);

    console.log(`createAtTime: ${createTime}`);
    return date.getHours();
};

// 시간 부분만 빼기 (시간 문자열에서 시간 추출)
const extractHourFromMeal = (createTime) => {
    if (!createTime) {
        return null;
    }

    const [hours] = createTime.split(':');

    console.log(`createAtTime: ${createTime}, Hour: ${hours}`);
    return parseInt(hours, 10);
};


const ListTime = ({ before, after, meal }) => {
    //console.log(before);
    //console.log(after);
    //console.log(meal);
    const timeIntervals = Array.from({ length: 25 }, (_, index) => index);

    return (
        <ListContainer>
            <ListBar />
            {timeIntervals.map(time => {
                const matchingBefore = before.filter(item => extractHour(item.createDate) === time) || null;
                const matchingAfter = after.filter(item => extractHour(item.createDate) === time) || null;
                const matchingMeal = meal.filter(item => extractHourFromMeal(item.createAtTime) === time) || null;

                return (
                    <ItemTime 
                        key={time} 
                        time={time}
                        before={matchingBefore}
                        after={matchingAfter}
                        meal={matchingMeal}
                    />
                );
            })}
        </ListContainer>
    );
}

export default ListTime;
