import React, { useState, useEffect } from 'react';
import colors from "../../../../styles/colors";
import styled from "styled-components";
import { API } from "../../../../api/axios";

const AfterContainer = styled.div`
    width: 100%;
    height: 2.8rem;
    background-color: ${props => (props.testResult === "진짜 배고픔" ? colors.subColor : colors.error)};
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
    margin-bottom: ${props => (props.testResult === "진짜 배고픔" ? "0.5rem" : "0rem")};
`;

const AfterP = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => (props.testResult === "진짜 배고픔" ? colors.gray6 : colors.gray1)};
`;

const FalseContainer = styled.div`
    width: 100%;
    padding: 0.8rem 0;
    padding-left: 1.2rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.4rem;
    margin-top: 0.8rem;
`;

const QnaButton = styled.button`
    width: 20%;
    height: 2.6rem;
    background-color: ${props => props.isClicked ? colors.mainColor : colors.violet10};
    border: none;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    color: ${props => props.isClicked ? colors.gray1 : colors.gray4};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
`;

const After = ({ data }) => {
    const [clickedButtons, setClickedButtons] = useState({});

    useEffect(() => {
        const initialClickedState = data.reduce((acc, item) => {
            acc[item.testId] = item.testWin;
            return acc;
        }, {});
        setClickedButtons(initialClickedState);
    }, [data]);

    const handleQnaClick = async (testId, testWin) => {
        try {
            const response = await API.patch(`api/tests/${testId}/win`, { testWin });
            console.log(response.data);
            
            setClickedButtons(prev => ({
                ...prev,
                [testId]: testWin
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {data.map((item, index) => {
                const testId = item.testId;
                const testResult = item.testResult;
                const isClicked = clickedButtons[testId];

                return (
                    <React.Fragment key={index}>
                        <AfterContainer testResult={testResult}>
                            <AfterP testResult={testResult}>식후 배고픔 테스트: {testResult}</AfterP>
                        </AfterContainer>

                        {testResult !== "진짜 배고픔" && (
                            <FalseContainer>
                                <AfterP style={{ color: colors.black }}>배고픔을 이겨냈나요?</AfterP>
                                <ButtonContainer>
                                    <QnaButton isClicked={isClicked === '승리'} onClick={() => handleQnaClick(testId, '승리')}>네</QnaButton>
                                    <QnaButton isClicked={isClicked === '패배'} onClick={() => handleQnaClick(testId, '패배')}>아니요</QnaButton>
                                </ButtonContainer>
                            </FalseContainer>
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
}

export default After;