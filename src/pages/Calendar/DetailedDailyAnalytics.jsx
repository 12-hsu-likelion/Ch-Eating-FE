import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocation } from 'react-router-dom';
import ListTime from '../../components/DetailedDailyAnalytics/Time/list-time';
import axios from "axios";

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 6rem;
`

const TopBar = styled.div`
    width: 38%;
    height: 0.2rem;
    background-color: ${colors.mainColor};
`

const TopDateContainer = styled.div`
    position: relative;
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopDate = styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.mainColor};
    text-align: center;
    z-index: 2;
`

const TopTextBackground = styled.div`
    width: 65%;
    height: 1.6rem;
    background-color: ${colors.violet50};
    position: absolute;
    margin-top: 1rem;
    border: none;
`

const BottomContainer = styled.div`
    width: 100%;
    min-height: 72.1rem;
    margin-top: 4rem;
    padding-left: 3.6rem;
    margin-bottom: 5.5rem;
`


const DetailedDailyAnalytics = () => {
    const location = useLocation();
    const {year, month, day} = location.state.dayInfo || {};

    const [before, setBefore] = useState([]);
    const [after, setAfter] = useState([]);
    const [meal, setMeal] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                setBefore(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                setAfter(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setMeal(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="pageContainer">
            <TopContainer>
                <TopBar />
                <TopDateContainer>
                    <TopDate>{month}/{day}</TopDate>
                    <TopTextBackground />
                </TopDateContainer>
                <TopBar />
            </TopContainer>

            <BottomContainer>
                <ListTime before={before} after={after} meal={meal}/>
            </BottomContainer>
        </div>
    );
};

export default DetailedDailyAnalytics;