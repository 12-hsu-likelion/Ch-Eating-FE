import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import Profile from "../../assets/images/profile.png";

const HeaderContainer = styled.div`
    width: 85%;
    height: 5.5rem;
    margin-bottom: 2.8rem;
    background-color: ${colors.backgroundColor};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const HeaderP = styled.p`
    font-size: 2rem;
    color: ${colors.black};
`

const HeaderImg = styled.img`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`

const Header = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleProfileClick = () => {
        navigate("/mypage");
    };

    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center"}}>
                <HeaderContainer>
                    <HeaderP onClick={handleHomeClick}>서비스명</HeaderP>
                    <HeaderImg src={Profile} alt="profile" onClick={handleProfileClick}/>
                </HeaderContainer>
        </div>
    )
}

export default Header;