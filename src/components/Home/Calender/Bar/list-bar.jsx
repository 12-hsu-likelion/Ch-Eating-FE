import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import ItemBar from "./item-bar";

const ListBarContainer = styled.div`
    width: 3.6rem;
    margin-top: 0.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ListBar = ({ date }) => {
    // 아직 구현안함 -> 아마 date 각각 7번 통신으로 갈듯
    const [success, setSuccess] = useState([]);

    useEffect(() => {
        const fetchSuccess = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setSuccess(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSuccess();
    }, []);

    return (
        <ListBarContainer>
            {success.slice(0, 3).map(success => (
                <ItemBar key={success.id} />
            ))}
        </ListBarContainer>
    );
};

export default ListBar;
