import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import { API } from "../../api/axios";
import HeaderLogo from "../../assets/images/headerLogo.png";
import HeaderNot from "../../assets/images/headerNot.png";
import HeaderYes from "../../assets/images/headerYes.png";
import { format, parseISO } from 'date-fns';

const HeaderContainer = styled.div`
    width: 90%;
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderLeft = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
`

const HeaderLogoImg = styled.img`
    width: 1.8rem;
    height: 1.8rem;
`

const HeaderP = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
    color: ${colors.subColor};
`

const HeaderRight = styled.div`
    display: flex;
    gap: 2rem;
`

const HeaderImg = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
`

const Header = () => {
    const navigate = useNavigate();
    const [meal, setMeal] = useState([]);
    const [userId, setUserId] = useState("");
    const [hasMealsToday, setHasMealsToday] = useState(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await API.get("/api/users/myPage");
                setUserId(response.data.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId) return;

            try {
                const response = await API.get('/api/meal/meals', {
                    params: { userId: userId }
                });
                const meals = response.data.data;
                setMeal(meals);

                const today = new Date();
                const todayFormatted = format(today, 'yyyy-MM-dd');
                console.log("Today's date:", todayFormatted);

                const hasMealsToday = meals.some(meal => {
                    const mealDate = format(parseISO(meal.createAt), 'yyyy-MM-dd');
                    return mealDate === todayFormatted;
                });

                setHasMealsToday(hasMealsToday);
                console.log("Has meals today:", hasMealsToday);

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMeals();
    }, [userId]);

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleMypageClick = () => {
        navigate("/mypage");
    };

    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center", backgroundColor: colors.mainColor}}>
            <HeaderContainer>
                <HeaderLeft onClick={handleHomeClick}>
                    <HeaderLogoImg src={HeaderLogo} alt="headerLogo" />
                    <HeaderP>Ch-Eating</HeaderP>
                </HeaderLeft>

                <HeaderRight>
                    <HeaderImg src={hasMealsToday ? HeaderYes : HeaderNot} alt={hasMealsToday ? "headerYes" : "headerNot"} onClick={handleMypageClick} />
                </HeaderRight>
            </HeaderContainer>
        </div>
    )
}

export default Header;
