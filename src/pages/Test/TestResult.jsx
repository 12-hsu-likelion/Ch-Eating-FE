import styled from "styled-components";
import colors from "../../styles/colors";
import { useNavigate, useParams } from "react-router-dom";
import ResultBeforeNot from "../../assets/images/resultBeforeNot.png";
import ResultBeforeYes from "../../assets/images/resultBeforeYes.png";
import ResultAfterNot from "../../assets/images/resultAfterNot.png";
import ResultAfterYes from "../../assets/images/resultAfterYes.png";

const ResultImg = styled.img`
    width: 95%;
    margin-top: 15.6rem;
`

const ResultButton = styled.button`
    width: 93%;
    height: 5.6rem;
    border: 0.1rem solid ${colors.black};
    border-radius: 2.9rem;
    background-color: ${colors.mainColor};
    font-size: 1.6rem;
    color: ${colors.gray1};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: cneter;
    cursor: pointer;
    margin-top: 9.3rem;
`

const TestResult = () => {
    const { activeType, testResult } = useParams();
    const navigate = useNavigate();
    console.log(activeType);
    console.log(testResult);

    const handleResultClick = () => {
        navigate("/");
    };

    let resultImage;
    switch (activeType) {
        case 'before':
            resultImage = testResult === "true" ? ResultBeforeYes : ResultBeforeNot;
            break;
        case 'after':
            resultImage = testResult === "true" ? ResultAfterNot : ResultAfterYes;
            break;
        default:
            console.log("error");
            break;
    }

    return (
        <div className="pageContainer" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <ResultImg src={resultImage} alt="resultImage"/>
            <ResultButton onClick={handleResultClick}>다음</ResultButton>
        </div>
    )
}

export default TestResult;