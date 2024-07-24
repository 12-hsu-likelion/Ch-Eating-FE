import React from "react";
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
    align-Items: center;
    justify-content: space-between;
`

const ListFilter = () => {
    const filterItems = FilterData;

    return (
        <ListContainer>
            <ItemContainer style={{ width: '100%' }}>
                {filterItems.slice(0, 5).map((item) => (
                    <ItemFilter key={item.id} name={item.name} />
                ))}
            </ItemContainer>

            <ItemContainer style={{ width: '80%' }}>
                {filterItems.slice(5, 9).map((item) => (
                    <ItemFilter key={item.id} name={item.name} />
                ))}
            </ItemContainer>

            <ItemContainer>
                {filterItems.slice(9, 10).map((item) => (
                    <ItemFilter key={item.id} name={item.name} />
                ))}
            </ItemContainer>
        </ListContainer>
    );
};

export default ListFilter;
