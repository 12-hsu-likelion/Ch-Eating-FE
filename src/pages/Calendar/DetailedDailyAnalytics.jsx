import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocation, useParams } from 'react-router-dom';
import ListTime from "../../components/Calendar/DetailedDailyAnalytics/Time/list-time";
import { API } from "../../api/axios";

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 6rem;
`;

const TopBar = styled.div`
    width: 38%;
    height: 0.2rem;
    background-color: ${colors.mainColor};
`;

const TopDateContainer = styled.div`
    position: relative;
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopDate = styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.mainColor};
    text-align: center;
    z-index: 2;
`;

const TopTextBackground = styled.div`
    width: 65%;
    height: 1.6rem;
    background-color: ${colors.violet50};
    position: absolute;
    margin-top: 1rem;
    border: none;
`;

const BottomContainer = styled.div`
    width: 100%;
    min-height: 72.1rem;
    margin-top: 4rem;
    padding-left: 3.6rem;
    margin-bottom: 5.5rem;
`;

const DetailedDailyAnalytics = () => {
    const { formattedDate } = useParams();
    //console.log("params:", formattedDate);

    const [year, month, day] = formattedDate.split('-').map(Number);

    const [userId, setUserId] = useState("");
    const [before, setBefore] = useState([]);
    const [after, setAfter] = useState([]);
    const [meal, setMeal] = useState([]);

    const getFormattedDate = (year, month, day) => {
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    };


    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await API.get("/api/users/myPage");
                setUserId(response.data.data.userId);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId || !year || !month || !day) return;

            try {
                const response = await API.get('/api/meal/meals', {
                    params: { userId: userId }
                });

                console.log("data:", response.data.data);
                const formattedDate = getFormattedDate(year, month, day);
                console.log("formattedDate:", formattedDate);

                console.log(meal);
                const filteredMeals = response.data.data.filter(meal =>
                    meal.createAt === formattedDate
                );

                //console.log("filteredMeals:", filteredMeals);
                setMeal(filteredMeals);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchMeals();
    }, [userId, year, month, day]);

    useEffect(() => {
        const fetchTests = async () => {
            if (!year || !month || !day) return;

            const formattedDate = getFormattedDate(year, month, day);

            try {
                const response = await API.get(`/api/tests/byDate`, {
                    params: { date: formattedDate }
                });

                const beforeTests = response.data.data.filter(test =>
                    test.testName === "식전 배고픔 테스트"
                );

                const afterTests = response.data.data.filter(test =>
                    test.testName === "식후 배고픔 테스트"
                );

                setBefore(beforeTests);
                setAfter(afterTests);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchTests();
    }, [year, month, day]);

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
                <ListTime before={before} after={after} meal={meal} />
            </BottomContainer>
        </div>
    );
};

export default DetailedDailyAnalytics;
