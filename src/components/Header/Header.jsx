import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import HeaderLogo from "../../assets/images/headerLogo.png";
import HeaderNot from "../../assets/images/headerNot.png";
import HeaderYes from "../../assets/images/headerYes.png";

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

const HeaderImg = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
`

const Header = () => {
    const navigate = useNavigate();
    const [meal, setMeal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setMeal(response.data.length > 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleMypageClick = () => {
        navigate("/mypage");
    };

    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center", backgroundColor: colors.mainColor}}>
                <HeaderContainer>
                    <HeaderLeft onClick={handleHomeClick}>
                        <HeaderLogoImg src={HeaderLogo} alt="headerLogo" />
                        <HeaderP>Ch-eating</HeaderP>
                    </HeaderLeft>
                    {meal ? (
                        <HeaderImg src={HeaderYes} alt="headerYes" onClick={handleMypageClick} />
                    ) : (
                        <HeaderImg src={HeaderNot} alt="headerNot" onClick={handleMypageClick} />
                    )}
                </HeaderContainer>
        </div>
    )
}

export default Header;