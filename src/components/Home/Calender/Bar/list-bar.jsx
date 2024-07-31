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
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users", {
                    params: { date }
                });
                console.log(response);

                if (response.data && Array.isArray(response.data)) {
                    setTestResults(response.data);
                } else if (response.data && Array.isArray(response.data.data)) {
                    setTestResults(response.data.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setTestResults([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setTestResults([]); 
            }
        };

        fetchTestResults();
    }, [date]);

    return (
        <ListBarContainer>
            {testResults
                .filter(result => result.testResult === '가짜 배고픔')
                .slice(0, 3)
                .map(result => (
                    <ItemBar 
                        key={result.testId} 
                        testWin={result.testWin} 
                    />
                ))}
        </ListBarContainer>
    );
};

export default ListBar;
