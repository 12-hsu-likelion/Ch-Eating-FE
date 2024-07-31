import React, { useState, useEffect } from 'react';
import {API} from "../../../api/axios";
import styled from "styled-components";
import colors from "../../../styles/colors";
import NotEat from "./NotEat/NotEat";
import ListEat from "./Eat/list-eat";

const MealContainer = styled.div`
    width: 100%;
    padding: 2.1rem 0;
    margin-top: 2rem;
    border: 0.05rem solid ${colors.gray2};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MealP = styled.p`
    width: 85%;
    font-size: 1.6rem;
    color: ${colors.black};
`

const Meal = () => {
    const [eat, setEat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/api/meal/meals');
                setEat(response.data.data);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <MealContainer>
            <MealP>나의 식사량</MealP>
            {eat.length === 0 ? <NotEat /> : <ListEat eat={eat}/>}
        </MealContainer>
    )
}

export default Meal;