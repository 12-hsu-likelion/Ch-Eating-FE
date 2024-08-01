import React, { useState, useEffect } from 'react';
import { API } from "../../../api/axios";
import styled from "styled-components";
import colors from "../../../styles/colors";
import NotEat from "./NotEat/NotEat";
import ListEat from "./Eat/list-eat";
import { format, parseISO } from 'date-fns';

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
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await API.get("/api/users/myPage");
                setUserId(response.data.data.userId);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId) return;

            try {
                const response = await API.get('/api/meal/meals', {
                    params: {
                        userId: userId
                    }
                });
                const meals = response.data.data;
                
                const today = new Date();
                const todayFormatted = format(today, 'yyyy-MM-dd');
                
                const todaysMeals = meals.filter(meal => format(parseISO(meal.createAt), 'yyyy-MM-dd') === todayFormatted);
                
                setEat(todaysMeals);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMeals();
    }, [userId]);

    return (
        <MealContainer>
            <MealP>나의 식사량</MealP>
            {eat.length === 0 ? <NotEat /> : <ListEat eat={eat} />}
        </MealContainer>
    );
}

export default Meal;
