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
                    params: { date: date }
                });
                console.log(date, ":", response.data.data);

                const sortedResults = response.data.data.sort((a, b) => {
                    const timeA = a.createTime.split(':').map(Number);
                    const timeB = b.createTime.split(':').map(Number);

                    const minutesA = timeA[0] * 60 + timeA[1];
                    const minutesB = timeB[0] * 60 + timeB[1];

                    if (minutesA !== minutesB) {
                        return minutesA - minutesB;
                    }

                    return a.testId - b.testId;
                });

                console.log("Sorted Results:", sortedResults);
                setTestResults(sortedResults);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (date) {
            fetchTestResults();
        }
    }, [date]);

    return (
        <ListBarContainer>
            {testResults
                .slice(0, 3)
                .map(result => (
                    <ItemBar 
                        key={result.testId} 
                        testresult={result.testResult} 
                    />
                ))}
        </ListBarContainer>
    );
};

export default ListBar;
