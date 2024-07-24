import React, { useState, useEffect } from "react";
import ItemFilter from "./item-filter";
import FilterData from "../../../../utils/Meal/FilterData";
import styled from "styled-components";

const ListContainer = styled.div`
    width: 100%;
    padding-top: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


// id 같은 거 뜨도록 필터링 버튼 구현함 -> 나중에 서버 연동 시 type으로 바꿀 것.
// 현재: 한식(1), 양식(2), ... 와 listMeal 통신 후 받은 데이터 배열의 id와 비교하여 같으면 뜨게 함
const ListFilter = ({ onSelectedItemsChange }) => {
    const filterItems = FilterData;
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelection = (itemId, isActive) => {
        setSelectedItems(prevSelectedItems => {
            if (isActive) {
                return [...prevSelectedItems, itemId];
            } else {
                return prevSelectedItems.filter(id => id !== itemId);
            }
        });
    };

    useEffect(() => {
        onSelectedItemsChange(selectedItems);
    }, [selectedItems, onSelectedItemsChange]);

    return (
        <ListContainer>
            <ItemContainer style={{ width: '100%' }}>
                {filterItems.slice(0, 5).map((item) => (
                    <ItemFilter
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isActive={selectedItems.includes(item.id)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>

            <ItemContainer style={{ width: '80%' }}>
                {filterItems.slice(5, 9).map((item) => (
                    <ItemFilter
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isActive={selectedItems.includes(item.id)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>

            <ItemContainer>
                {filterItems.slice(9, 10).map((item) => (
                    <ItemFilter
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isActive={selectedItems.includes(item.id)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>
        </ListContainer>
    );
};

export default ListFilter;
