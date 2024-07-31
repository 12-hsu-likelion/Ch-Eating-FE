import React, { useState, useEffect } from "react";
import ItemType from "./item-type";
import FilterData from "../../../../utils/Meal/FilterData";
import styled from "styled-components";

const ListContainer = styled.div`
    width: 100%;
    padding-top: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 4.2rem;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ListType = ({ onTypeSelect }) => {
    const [selectedType, setSelectedType] = useState("");

    const handleSetActiveItem = (id, type) => {
        const newType = selectedType === type ? "" : type;
        setSelectedType(newType);
        onTypeSelect(newType);
    };

    useEffect(() => {
        //console.log(selectedType);
    }, [selectedType]);

    return (
        <ListContainer>
            <ItemContainer style={{ width: '100%' }}>
                {FilterData.slice(0, 5).map((item) => (
                    <ItemType
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        setActiveItem={handleSetActiveItem}
                        active={selectedType === item.type}
                    />
                ))}
            </ItemContainer>

            <ItemContainer style={{ width: '80%' }}>
                {FilterData.slice(5, 9).map((item) => (
                    <ItemType
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        setActiveItem={handleSetActiveItem}
                        active={selectedType === item.type}
                    />
                ))}
            </ItemContainer>

            <ItemContainer>
                {FilterData.slice(9, 10).map((item) => (
                    <ItemType
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        setActiveItem={handleSetActiveItem}
                        active={selectedType === item.type}
                    />
                ))}
            </ItemContainer>
        </ListContainer>
    );
};

export default ListType;
