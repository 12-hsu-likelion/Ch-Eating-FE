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


// 시간 부분만 빼기 (date 문자열에서 시간 추출)
const extractHourFromDate = (dateTime) => {
    if (!dateTime) {
        return null;
    }
    // "2024-08-02-14:30" 형태
    const parts = dateTime.split('-');
    const timePart = parts[3];
    const [hours] = timePart.split(':');
    return parseInt(hours, 10);
};

// 시간 부분만 빼기 (시간 문자열에서 시간 추출)
const extractHourFromMeal = (time) => {
    if (!time) {
        return null;
    }
    // "14:30:00" 형태
    const [hours] = time.split(':');
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
                const matchingBefore = before.filter(item => extractHourFromDate(item.createDate) === time) || null;
                const matchingAfter = after.filter(item => extractHourFromDate(item.createDate) === time) || null;
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
