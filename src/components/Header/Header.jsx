import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import HeaderLogo from "../../assets/images/headerLogo.png";
import HeaderNot from "../../assets/images/headerNot.png";
import HeaderYes from "../../assets/images/headerYes.png";
import HeaderNoticeNot from "../../assets/images/headerNoticeNot.png";
import HeaderNoticeYes from "../../assets/images/headerNoticeYes.png";

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
    const [meal, setMeal] = useState(false);
    const [notice, setNotice] = useState(false);

    // 헤더 맨 오른쪽 얼굴 사진
    useEffect(() => {
        fetchDataMeal();
    }, []);

    const fetchDataMeal = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setMeal(response.data.length > 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchDataNotice();
    }, []);

    // 헤더 알림 표시 -> 알림 표시된 사진이 뜨는 기준을 모르겠어서 나중에 다시 해놓겠습니다.
    const fetchDataNotice = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setNotice(response.data.length > 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleNoticeClick = () => {
        navigate("/notice");
    }

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
                        <HeaderImg src={notice ? HeaderNoticeYes : HeaderNoticeNot} alt="headerNoticeNot" onClick={handleNoticeClick} />
                        <HeaderImg src={meal ? HeaderYes : HeaderNot} alt={meal ? "headerYes" : "headerNot"} onClick={handleMypageClick} />
                    </HeaderRight>
                </HeaderContainer>
        </div>
    )
}

export default Header;