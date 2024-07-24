import styled from "styled-components";
import colors from "../../styles/colors";
import ListMeal from "../../components/Meal/MealHome/Meal/list-meal";
import { useNavigate } from 'react-router-dom';

const MealContainer = styled.div`
    width: 90%;
    padding-top: 8.6rem;
`

const MealTitle = styled.p`
    font-size: 1.2rem;
    color: ${colors.gray5};
`

const MealTitle2 = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${colors.black};
    margin-top: 0.8rem;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const AddButton = styled.button`
    width: 12.2rem;
    height: 3.2rem;
    border: none;
    border-radius: 0.8rem;
    background-color: ${colors.mainColor};
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${colors.gray1};
`

const MealHome = () => {
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/post");
    }

    return (
        <div className="pageContainer" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <MealContainer>
                <MealTitle>나의 식사량</MealTitle>
                <MealTitle2>식사량을 기록하고 과식을 방지하세요.</MealTitle2>
            
                <ButtonContainer>
                    <AddButton onClick={handleAddClick}>새 기록 추가</AddButton>
                </ButtonContainer>
                
                <ListMeal />
            </MealContainer>
        </div>
    )
}

export default MealHome;