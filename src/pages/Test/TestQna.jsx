import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../../styles/colors';
import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
`

const QnaButton = styled.button`
    background-color: ${props => props.active ? colors.mainColor : colors.gray1};
    color: ${props => props.active ? colors.gray1 : colors.mainColor};
    border: 2px solid ${colors.mainColor};
    padding: 10px 20px;
    cursor: pointer;
`

const ResultButton = styled.button`
    background-color: ${colors.subColor};
    margin-top: 2rem;
    padding: 10px 20px;
    cursor: pointer;
`

const TestQna = () => {
    const { activeType } = useParams();
    const navigate = useNavigate();

    const [isActiveType, setIsActiveType] = useState(activeType);
    const [isHungry, setIsHungry] = useState(true);

    const renderQuestion = (isActiveType) => {
        if (isActiveType === 'before') {
            return "특정 음식이 먹고싶나요?";
        } else if (isActiveType === 'after') {
            return "식사 후 괜히 먹었다는 후회감이 드나요?";
        }
    };

    const handleSelectClick = (value) => {
        setIsHungry(value);
    };

    useEffect(() => {
        console.log("테스트 종류: ", isActiveType);
        console.log("결과 값: ", isHungry);
    }, [isActiveType, isHungry]);

    const handleResultClick = () => {
        navigate(`/result/${isActiveType}/${isHungry}`);
    }

    return (
        <>
            <p>테스트 종류: {isActiveType}</p>
            <p>{renderQuestion(isActiveType)}</p>

            <ButtonContainer>
                {isActiveType === 'before' && (
                    <>
                        <QnaButton active={isHungry === true} onClick={() => handleSelectClick(true)}>네(진짜 배고픔)</QnaButton>
                        <QnaButton active={isHungry === false} onClick={() => handleSelectClick(false)}>아니오(가짜 배고픔)</QnaButton>
                    </>
                )}
                {isActiveType === 'after' && (
                    <>
                        <QnaButton active={isHungry === true} onClick={() => handleSelectClick(true)}>네(가짜 배고픔)</QnaButton>
                        <QnaButton active={isHungry === false} onClick={() => handleSelectClick(false)}>아니오(진짜 배고픔)</QnaButton>
                    </>
                )}
            </ButtonContainer>

            <ResultButton onClick={handleResultClick}>결과 확인</ResultButton>
        </>
    )
}

export default TestQna;
