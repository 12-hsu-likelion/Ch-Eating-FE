import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const TestNumber = ({number, currentQuestion, setCurrentQuestion}) => {
    return (
        <StyledTestNumber $number = {number} $currentQuestion = {currentQuestion} onClick={()=>{
            setCurrentQuestion(number);
        }} >
            {number}
        </StyledTestNumber>
    );
};

const StyledTestNumber = styled.div`
    width: 24px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${({$number, $currentQuestion}) => $number === $currentQuestion ? colors.mainColor : colors.gray1};
    background-color: ${({$number, $currentQuestion})=>{
        if($number < $currentQuestion){
            return colors.mainColor;
        }
        else if($number === $currentQuestion){
            return colors.subColor;
        }
        else{
            return "#D9D9D9";
        }
    }};
`;

export default TestNumber;