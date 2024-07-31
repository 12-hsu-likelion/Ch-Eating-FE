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

const ListFilter = ({ onSelectedItemsChange }) => {
    const filterItems = FilterData;
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleSelection = (itemType, isActive) => {
        setSelectedTypes(prevSelectedTypes => {
            if (isActive) {
                return [...prevSelectedTypes, itemType];
            } else {
                return prevSelectedTypes.filter(type => type !== itemType);
            }
        });
    };

    useEffect(() => {
        onSelectedItemsChange(selectedTypes);
    }, [selectedTypes, onSelectedItemsChange]);

    return (
        <ListContainer>
            <ItemContainer style={{ width: '100%' }}>
                {filterItems.slice(0, 5).map((item) => (
                    <ItemFilter
                        key={item.type}
                        type={item.type}
                        name={item.name}
                        isActive={selectedTypes.includes(item.type)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>

            <ItemContainer style={{ width: '80%' }}>
                {filterItems.slice(5, 9).map((item) => (
                    <ItemFilter
                        key={item.type}
                        type={item.type}
                        name={item.name}
                        isActive={selectedTypes.includes(item.type)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>

            <ItemContainer>
                {filterItems.slice(9, 10).map((item) => (
                    <ItemFilter
                        key={item.type}
                        type={item.type}
                        name={item.name}
                        isActive={selectedTypes.includes(item.type)}
                        handleSelection={handleSelection}
                    />
                ))}
            </ItemContainer>
        </ListContainer>
    );
};

export default ListFilter;
