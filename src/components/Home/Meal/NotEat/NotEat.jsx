import styled from "styled-components";
import colors from "../../../../styles/colors";
import { useNavigate } from 'react-router-dom';

const NotEatContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-top: 1.5rem;
`

const NotEatP = styled.p`
    font-size: 1.6rem;
    color: ${colors.black};
`

const MealButton = styled.button`
    width: 85%;
    height: 5.6rem;
    background-color: ${colors.mainColor};
    border: 0.1rem solid ${colors.black};
    border-radius: 2.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    font-size: 1.6rem;
    color: ${colors.gray1};
    font-weight: 700;
    margin-top: 2.3rem;
`

const NotEat = () => {
    const navigate = useNavigate();

    const handleMealButtonClick = () => {
        navigate('/meal');
    };

    return (
        <NotEatContainer>
            <PContainer>
                <NotEatP>아직 식사량을 입력하지 않았어요.</NotEatP>
                <NotEatP>식사량을 입력하여 과식을 방지해보세요!</NotEatP>
            </PContainer>

            <MealButton onClick={handleMealButtonClick}>식사량 입력하기</MealButton>
        </NotEatContainer>
    )
}

export default NotEat;