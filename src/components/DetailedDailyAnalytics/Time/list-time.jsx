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

const ListTime = ({ before, after, meal }) => {
    const timeIntervals = Array.from({ length: 25 }, (_, index) => index);

    return (
        <ListContainer>
            <ListBar />
            {timeIntervals.map(time => {
                // 나중에 id와 일치하는게 아닌 testTime 일치로 바꿀 것
                const matchingBefore = before.find(before => before.id === time);
                const matchingAfter = after.find(after => after.id === time);
                const matchingMeal = meal.find(meal => meal.id === time);

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
