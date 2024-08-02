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
const extractHour = (createTime) => {
    if (!createTime) {
        return null;
    }

    const formattedTime = createTime.replace(/-/g, '/');
    const date = new Date(formattedTime);
    return date.getHours();
};

const extractHourFromMeal = (createAtTime) => {
    if (!createAtTime) {
        return null;
    }

    const date = new Date(createAtTime);
    return date.getHours();
};

const ListTime = ({ before, after, meal }) => {
    //console.log(before);
    //console.log(after);
    console.log(meal);
    const timeIntervals = Array.from({ length: 25 }, (_, index) => index);

    return (
        <ListContainer>
            <ListBar />
            {timeIntervals.map(time => {
                //                              여기 밑에 item.createTime->item.createDate로 명세 바뀌어서 바꿔놨어요
                const matchingBefore = before.filter(item => extractHour(item.createDate) === time) || null;
                //                              여기 밑에 item.createTime->item.createDate로 명세 바뀌어서 바꿔놨어요
                const matchingAfter = after.filter(item => extractHour(item.createDate) === time) || null;
                //                                          이 밑의 item.createAtTiem은 뭔지 몰라서 건들지 않았습니다
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
