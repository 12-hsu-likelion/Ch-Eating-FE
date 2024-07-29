import React from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import Before from "../Time/TimeDetail/Before";
import After from "../Time/TimeDetail/After";
import Meal from "../Time/TimeDetail/Meal";

const ItemContainer = styled.div`
    background-color: pink;
    padding: 0.5rem;
    margin: 0.2rem 0;
    width: 100%;
    display: flex;
    margin-bottom: 2.8rem;
`;

const TimeP = styled.p`
    width: 10%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${colors.gray6};
`

const ContentContainer = styled.div`
    width: 90%;
    height: 100%;
    padding-left: 2%;
`

const ItemTime = ({ time, before, after, meal }) => {
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
    };


    return (
        <ItemContainer>
            <TimeP>{formatTime(time)}:00</TimeP>
            <ContentContainer>
                {before && <Before data={before}/>}
                {after && <After data={after}/>}
                {meal && <Meal />}
            </ContentContainer>
        </ItemContainer>
    );
}

export default ItemTime;
