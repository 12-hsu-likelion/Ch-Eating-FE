import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../../../styles/colors";
import axios from "axios";
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
`

const NotContainer = styled.div`
    width: 100%;
    text-align: center;
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
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);

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

    const getFilteredData = () => {
        let filteredData = [...meals];

        // 이름으로 검색 필터링 -> 서버 연동 필요없음. 프론트만으로 처리함
        if (searchInput.trim() !== '') {
            filteredData = filteredData.filter
                (item => item.name.toLowerCase().startsWith(searchInput.toLowerCase())
            );
        }

        // id 같은 거 뜨도록 필터링 버튼 구현함 -> 나중에 서버 연동 시 type으로 바꿀 것.
        // 현재: 한식(1), 양식(2), ... 와 listMeal 통신 후 받은 데이터 배열의 id와 비교하여 같으면 뜨게 함
        if (selectedFilterItems.length > 0) {
            filteredData = filteredData.filter(item =>
                selectedFilterItems.includes(item.id)
            );
        }

        return filteredData;
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    }

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
                            key={meal.id} 
                            name={meal.name} 
                            username={meal.username}
                            email={meal.email}
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
    )
}

export default ListMeal;
