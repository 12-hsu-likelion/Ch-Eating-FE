import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import ItemBar from "./item-bar";
import { API } from "../../../../api/axios";

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
                const response = await API.get("api/tests/byDate", {
                    params: { date }
                });
                console.log("서버 응답 데이터:", response.data.data);

                if (Array.isArray(response.data.data)) {
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

        if (date) { 
            fetchTestResults();
        }
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
