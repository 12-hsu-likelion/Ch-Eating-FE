import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../../../styles/colors";
import axios from "axios";
import ItemMeal from "./item-meal";
import InputMeal from '../Input/input-meal';
import ListFilter from '../Filter/list-filter';

const ListContainer = styled.div`
    width: 100%; 
    margin: 3.6rem 0 6.1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`

const NotP = styled.p`
    font-size: 1.6rem;
    font-weight: 300;
    color: ${colors.gray3};
    margin: 17.5rem 0 31.1rem;
`

const ListMeal = () => {
    const [meals, setMeals] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                console.log(response.data);
                setMeals(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMeals();
    }, []);

    const filteredMealData = meals.filter(item => item.name.toLowerCase().startsWith(searchInput.toLowerCase()));

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    return (
        <>
            <InputMeal 
                type="text"
                onChange={handleInputChange}
                value={searchInput}
            />

            <ListFilter />

            {filteredMealData.length > 0 ? (
                <ListContainer>
                    {filteredMealData.map(meal => (
                        <ItemMeal 
                            key={meal.id} 
                            name={meal.name} 
                            username={meal.username}
                            email={meal.email}
                        />
                    ))}
                </ListContainer>
            ) : (
                <NotP>아직 식사량을 기록하지 않았어요!</NotP>
            )}
        </>
    )
}

export default ListMeal;