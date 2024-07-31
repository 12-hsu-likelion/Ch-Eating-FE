import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../../../styles/colors";
import { API } from "../../../../api/axios";
import ItemMeal from "./item-meal";
import InputMeal from '../Input/input-meal';
import ListFilter from '../Filter/list-filter';

const ListContainer = styled.div`
    width: 100%; 
    margin-top: 3.6rem;
    margin-bottom: 6.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const NotContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const NotP = styled.p`
    font-size: 1.6rem;
    font-weight: 300;
    color: ${colors.gray3};
    margin: 17.5rem 0 31.1rem;
`;

const ListMeal = () => {
    const [meals, setMeals] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await API.get('/api/meal/meals');
                console.log(response);
                setMeals(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMeals();
    }, []);

    const getFilteredData = () => {
        let filteredData = [...meals];

        if (searchInput.trim() !== '') {
            filteredData = filteredData.filter(item =>
                item.mealName.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        if (selectedFilterItems.length > 0) {
            filteredData = filteredData.filter(item =>
                selectedFilterItems.includes(item.mealType)
            );
        }

        return filteredData;
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSelectedItemsChange = (selectedItems) => {
        setSelectedFilterItems(selectedItems);
        console.log("선택된 필터 아이템들:", selectedItems);
    };

    const filteredMealData = getFilteredData();

    return (
        <>
            <InputMeal
                type="text"
                onChange={handleInputChange}
                value={searchInput}
            />

            <ListFilter onSelectedItemsChange={handleSelectedItemsChange} />

            {filteredMealData.length > 0 ? (
                <ListContainer>
                    {filteredMealData.map(meal => (
                        <ItemMeal
                            key={meal.mealId}
                            id={meal.mealId}
                            name={meal.mealName}
                            amount={meal.mealAmount}
                            detail={meal.mealDetail}
                            selectedFilterItems={selectedFilterItems}
                        />
                    ))}
                </ListContainer>
            ) : (
                <NotContainer>
                    <NotP>아직 식사량을 기록하지 않았어요!</NotP>
                </NotContainer>
            )}
        </>
    );
};

export default ListMeal;
