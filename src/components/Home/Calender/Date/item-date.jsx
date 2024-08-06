import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ListBar from "../Bar/list-bar";
import colors from "../../../../styles/colors";

const DateContainer = styled.div`
    width: calc(100% / 7);
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: ${props => (props.$istoday === 'true' ? colors.violet10 : "white")};
    border-radius: ${props => 
        props.$isfirst === 'true' ? '0 0 0 0.8rem' : 
        props.$islast === 'true' ? '0 0 0.8rem 0' : 
        '0'};
    border: none;
    cursor: pointer;
`;

const DateItem = styled.div`
    margin-top: 0.2rem;
`;

const DayP = styled.p`
    font-size: 1rem;
    color: ${colors.gray4};
    font-weight: 500;
`;

const DateP = styled.p`
    font-size: 1.6rem;
    color: black;
    font-weight: 600;
`;

const ItemDate = ({ date, day, istoday = false, isfirst = false, islast = false, formattedDates }) => {
    const navigate = useNavigate();

    const handleDateClick = () => {
        navigate(`/detailedanalytics/${formattedDates}`);
    };

    return (
        <DateContainer 
            $istoday={istoday.toString()} 
            $isfirst={isfirst.toString()} 
            $islast={islast.toString()} 
            onClick={handleDateClick}
        >
            <DateItem>
                <DayP>{day}</DayP>
                <DateP>{date.getDate()}</DateP>
                <ListBar date={formattedDates}/>
            </DateItem>
        </DateContainer>
    );
};

export default ItemDate;
