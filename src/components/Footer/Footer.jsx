import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Footer_calender from "../../assets/images/footer_calender.png";
import Footer_home from "../../assets/images/footer_home.png";
import Footer_test from "../../assets/images/footer_test.png";
import Footer_meal from "../../assets/images/footer_meal.png";

const FooterContainer = styled.div`
    width: 430px;
    height: 5.5rem;
    background-color: white;
    border: none;
    border-radius: 1.6rem 1.6rem 0 0;
    box-shadow: 0 0 1.6rem 0 rgba(50, 50, 50, 0.08);
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 429px) {
        width: 100%;
    }
`;

const IconContainer = styled.div`
    width: 72%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const IconImg = styled.img`
    cursor: pointer;
    width: 3rem;
`

const Footer = () => {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    const handleTestButtonClick = () => {
        navigate('/test');
    };

    const handleCalenderButtonClick = () => {
        navigate('/calendar');
    };

    const handleMealButtonClick = () => {
        navigate('/meal');
    };

    return (
        <div className="pageContainer">
            <FooterContainer>
                <IconContainer>
                    <IconImg src={Footer_home} alt="home" onClick={handleHomeButtonClick} />
                    <IconImg src={Footer_test} alt="test" onClick={handleTestButtonClick} />
                    <IconImg src={Footer_calender} alt="calender" onClick={handleCalenderButtonClick} />
                    <IconImg src={Footer_meal} alt="meal" onClick={handleMealButtonClick} />
                </IconContainer>
            </FooterContainer>
        </div>
    )
}

export default Footer;