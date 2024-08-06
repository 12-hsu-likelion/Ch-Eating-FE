import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../../styles/colors";
import Plus from "../../../assets/images/plus.png";
import ListDate from "./Date/list-date";
import { useNavigate } from 'react-router-dom';

const CalenderContainer = styled.div`
    width: 85%;
    margin-top: 4rem;
`

const CalenderTop = styled.div`
    width: 100%;
    height: 2.4rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 0.8rem 0.8rem 0 0;
    padding: 0.5rem 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CalenderTopP = styled.p`
    font-size: 1.2rem;
    color: white;
`

const PlusImg = styled.img`
    width: 2.2rem;
    cursor: pointer;
`

const Calender = () => {
    const [month, setMonth] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        setMonth(monthNames[date.getMonth()]);
    }, []);

    const handlePlusClick = () => {
        navigate('/calendar');
    };

    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center"}}>
            <CalenderContainer>
                <CalenderTop>
                    <CalenderTopP>{month}</CalenderTopP>
                    <PlusImg src={Plus} onClick={handlePlusClick} alt="plus" />
                </CalenderTop>
                <ListDate />
            </CalenderContainer>
        </div>
    )
}

export default Calender;