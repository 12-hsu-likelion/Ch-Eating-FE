import colors from "../../../../styles/colors";
import styled from "styled-components";

const MealContainer = styled.div`
    width: 100%;
    height: 2.8rem;
    background-color: ${colors.violet10};
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
    margin-bottom: 0.5rem;
`

const MealP = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${colors.gray6};
`

const Meal = ({ data }) => {
    return (
        <>
            <React.Fragment key={index}>
                <MealContainer>
                    <MealP>식사</MealP>
                </MealContainer>
            </React.Fragment>
        </>
    )
}

export default Meal;