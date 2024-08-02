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

            // 시간 빠른 순으로 정렬
            const convertToISO = (dateStr) => {
                return dateStr.replace(/-(\d{2}):(\d{2})$/, 'T$1:$2:00Z');
            };

            const sortedResults = response.data.data.sort((a, b) => {
                return new Date(convertToISO(a.createTime)) - new Date(convertToISO(b.createTime));
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
