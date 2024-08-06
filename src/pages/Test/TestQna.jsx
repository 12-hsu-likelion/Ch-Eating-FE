import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../../styles/colors';
import styled from 'styled-components';
import questionType from '../../components/Test/TestQuestion';
import TestNumber from '../../components/Test/TestNumber';
import dropDown from '../../assets/images/drop_down.png';
import { useTimeInput } from '../../hooks/useTimeInput';
import BeforeLastAnswer from '../../components/Test/BeforeLastAnswer';
import { API } from '../../api/axios';

const TestQna = () => {
    const { activeType } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(
        activeType === 'before' ? questionType.before : questionType.after
    );
    const [currentQuestion, setCurrentQuestion] = useState(1);
    let fakeHungerCount = 0;

    const [inputHour, handleInputHour, setInputHour] = useTimeInput('', 'hour');
    const [inputMin, handleInputMin, setInputMin] = useTimeInput('', 'min');

    const [currentTime, setCurrentTime] = useState(null);

    const [beforeAnswer, setBeforeAnswer] = useState({
        dropDownOn: false,
        ampm: 'AM',
        answer: {
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        }
    });

    const [afterAnswer, setAfterAnswer] = useState({
        answer: {
            1: '',
            2: '',
            3: ''
        }
    });

    function ampmClick(e) {
        setBeforeAnswer(prev => ({
            ...prev,
            dropDownOn: !prev.dropDownOn,
            ampm: e.target.textContent
        }));
    }

    function clickYesOrNo(e) {
        const setCurrentAnswer = activeType === "before" ? setBeforeAnswer : setAfterAnswer;

        setCurrentAnswer(prev => ({
            ...prev,
            answer: {
                ...prev.answer,
                [currentQuestion]: e.target.textContent
            }
        }))
    }

    // 결과를 도출하고 통신을 보내고 사용자를 안내하는 함수
    async function getTestResult(answer) {
        const value = Object.values(answer);

        if (activeType === "before") {
            value.map((e, i) => {
                if (i === 0) {
                    const diff = (currentTime - e + 1440) % 1440;
                    if (diff <= 180) {
                        fakeHungerCount += 1;
                    }
                }
                else if (i === 1) {
                    fakeHungerCount += e === "네" ? 1 : 0;
                }
                else if (i === 2 || i === 3) {
                    fakeHungerCount += e === "아니오" ? 1 : 0;
                }
                else {
                    fakeHungerCount += e >= 4 ? 1 : 0;
                }
            })
        } else {
            value.map(e => {
                if (e !== "아니오") {
                    fakeHungerCount++;
                }
            })
        }

        const isFakeHunger = fakeHungerCount > questions.length / 2 ? true : false;

        const testName = activeType === "before" ? "식전 배고픔 테스트" : "식후 배고픔 테스트"
        const testResult = isFakeHunger ? "가짜 배고픔" : "진짜 배고픔"

        try {
            const response = await API.post("/api/tests/test", {
                testName,
                testResult
            });

            console.log(response.data);
        } catch (e) {
            console.log(e);
            alert("오류가 발생했습니다.");
            return;
        }

        if (isFakeHunger) {
            navigate(`/result/${activeType}/fakehunger`);
        }
        else {
            navigate(`/result/${activeType}/realhunger`);
        }
    }

    function gotoNextOrPrev(e) {
        if (e.target.textContent === "이전") {
            setCurrentQuestion(prev => prev - 1);
        }
        else {
            if (currentQuestion === questions.length) {
                const currentAnswer = activeType === "before" ? beforeAnswer : afterAnswer;

                if (Object.values(currentAnswer.answer).some(value => value === '')) {
                    alert("모든 항목에 답해주세요");
                    return;
                }

                getTestResult(currentAnswer.answer);

                return;
            }
            setCurrentQuestion(prev => prev + 1);
        }
    }

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.getHours() * 60 + now.getMinutes());
    }, []);

    useEffect(() => {
        if (currentQuestion !== 1 && activeType === "before") {

            if (inputHour === "" && inputMin === "") {
                return;
            }

            setBeforeAnswer(prev => ({
                ...prev,
                answer: {
                    ...prev.answer,
                    [1]: prev.ampm === "AM" ?
                        (Number(inputHour) === 12 ? Number(inputMin) : Number(inputHour) * 60 + Number(inputMin)) :
                        (Number(inputHour) === 12 ? Number(inputHour) * 60 + Number(inputMin) : Number(inputHour) * 60 + Number(inputMin) + 720)
                }
            }));
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (inputHour === "" && inputMin === "") {
            setBeforeAnswer(prev => ({
                ...prev,
                answer: {
                    ...prev.answer,
                    [1]: ""
                }
            }))
        }
    }, [inputHour, inputMin]);

    return (
        <StyledTestQna className='pageContainer'>
            <div className="test-page-wrapper">
                <div className="title">
                    {activeType === 'before' ? '식전 테스트' : '식후 테스트'}
                </div>
                <div className="order">
                    {questions.map((_, i) => (
                        <TestNumber
                            key={i}
                            number={i + 1}
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                        >
                            {i}
                        </TestNumber>
                    ))}
                </div>

                <div className="question-content">
                    <p style={{ marginTop: '98px', marginBottom: '10px' }}>질문</p>
                    <h4
                        className='question'
                        style={{
                            marginBottom: (activeType === "before" && currentQuestion === 1) ? "62px" :
                                ((activeType === "before" && currentQuestion === 3) || (activeType === "after" && currentQuestion === 3)) ? "69px" :
                                    "92.5px"
                        }}
                    >
                        {questions[currentQuestion - 1]}
                    </h4>
                    <p style={{ marginBottom: (activeType === "before" && currentQuestion === 1) ? "45px" : "27px" }}>답변</p>
                    <div className="answer-wrapper">
                        {activeType === 'before' && currentQuestion === 1 && (
                            <div className='answer-for-question1'>
                                <ul className='drop-down'>
                                    <li onClick={ampmClick}>{beforeAnswer.ampm}</li>
                                    {beforeAnswer.dropDownOn && (
                                        <li onClick={ampmClick}>
                                            {beforeAnswer.ampm === 'AM' ? 'PM' : 'AM'}
                                        </li>
                                    )}
                                    <div className="img-wrapper">
                                        <img src={dropDown} alt="" />
                                    </div>
                                </ul>
                                <div className="time-input-wrapper">
                                    <input
                                        type="text"
                                        value={inputHour}
                                        onChange={handleInputHour}
                                        placeholder='00'
                                        maxLength={2}
                                        onBlur={() => {
                                            if (inputHour === "") {
                                                return;
                                            }
                                            if (inputHour < 10) {
                                                setInputHour(inputHour.toString().padStart(2, '0'));
                                            }
                                        }}
                                    />
                                    <span>:</span>
                                    <input
                                        type="text"
                                        value={inputMin}
                                        onChange={handleInputMin}
                                        placeholder='00'
                                        maxLength={2}
                                        onBlur={() => {
                                            if (inputMin === "") {
                                                return;
                                            }
                                            if (inputMin < 10) {
                                                setInputMin(inputMin.toString().padStart(2, '0'));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {(activeType === 'before' && currentQuestion >= 2 && currentQuestion <= 4) || activeType === 'after' ? (
                            <div className='answer-type-yorn'>
                                <StyledYesOrNoButton onClick={clickYesOrNo} $clicked={(activeType === 'before' ? beforeAnswer : afterAnswer).answer[currentQuestion] === "네"}>네</StyledYesOrNoButton>
                                <StyledYesOrNoButton onClick={clickYesOrNo} $clicked={(activeType === 'before' ? beforeAnswer : afterAnswer).answer[currentQuestion] === "아니오"}>아니오</StyledYesOrNoButton>
                            </div>
                        ) : null}

                        {activeType === 'before' && currentQuestion === 5 && (
                            <BeforeLastAnswer beforeAnswer={beforeAnswer} setBeforeAnswer={setBeforeAnswer} />
                        )}
                    </div>
                </div>

                <div className="prev-or-next-btns">
                    <StyledPrevOrNextButton onClick={gotoNextOrPrev} $inVisible={currentQuestion === 1}>이전</StyledPrevOrNextButton>
                    <StyledPrevOrNextButton onClick={gotoNextOrPrev} $isAnswered={activeType === "before" ? (currentQuestion === 1
                        ? (inputHour !== "" || inputMin !== "")
                        : beforeAnswer.answer[currentQuestion] !== ""
                    )
                        : afterAnswer.answer[currentQuestion] !== ""} >다음</StyledPrevOrNextButton>
                </div>
            </div>
        </StyledTestQna>
    );
};

const StyledTestQna = styled.section`
    .test-page-wrapper {
        margin: 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
            margin-top: 89px;
            font-size: 16px;
            font-weight: 600;
            color: ${colors.gray6};
            margin-bottom: 26px;
        }

        .order {
            display: flex;
            gap: 26px;
            margin-bottom: 21px;
        }

        .question-content {
            border-radius: 8px;
            border: 0.5px solid ${colors.gray2};
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 380px;
            width: 100%;

            > p {
                color: #9FA4A8;
                font-weight: 600;
                font-size: 16px;
            }

            .question {
                white-space: pre-line;
                text-align: center;
                color: ${colors.black};
                font-size: 20px;
                font-weight: 500;
            }

            .answer-wrapper {
                .answer-for-question1 {
                    display: flex;

                    .drop-down {
                        position: relative;

                        li {
                            cursor: pointer;
                            color: #9FA4A8;
                            font-size: 16px;
                            padding: 9px 50px 9px 20px;
                            border: 0.5px solid ${colors.gray2};
                            border-radius: 4px;
                            background-color: ${colors.gray1};
                        }

                        .img-wrapper {
                            cursor: pointer;
                            width: 18.5px;
                            aspect-ratio: 1/1;
                            position: absolute;
                            right: 16.5px;
                            top: 11px;
                            pointer-events: none;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: fill;
                            }
                        }
                    }

                    .time-input-wrapper {
                        height: fit-content;
                        display: flex;
                        height: 38.89px;
                        align-items: center;
                        background-color: ${colors.gray1};
                        border: 0.5px solid ${colors.gray2};
                        border-radius: 4px;
                        margin-left: 24px;
                        width: calc(254px + (100vw - 430px) * 1);
                        max-width: 254px;
                        justify-content: center;

                        span {
                            color: #9FA4A8;
                            font-size: 16px;
                            margin: 0 min(36px, calc(36px + (100vw - 430px) * 0.1));
                        }

                        input {
                            color: ${colors.black};
                            font-size: 16px;
                            width: calc(45px + (100vw - 430px) * .1);
                            max-width: 45px;
                            height: 90%;
                            text-align: center;

                            &::placeholder {
                                color: #9FA4A8;
                            }
                        }
                    }
                }

                .answer-type-yorn{
                    display: flex;
                    gap: 8px;
                }
            }
        }

        .prev-or-next-btns{
            width: 100%;
            display: flex;
            gap: 8.3px;
            margin: 55px 16px 36px 16px;
        }
    }
`;

const StyledYesOrNoButton = styled.button`
    font-size: 16px;
    width: calc(156px + (100vw - 430px) * .4);
    max-width: 156px;
    height: 45px;
    border-radius: 8px;
    color: ${({ $clicked }) => $clicked ? colors.gray1 : "#9FA4A8"};
    background-color: ${({ $clicked }) => $clicked ? colors.mainColor : colors.violet10};
    font-family:'Pretendard-Regular';
`;

const StyledPrevOrNextButton = styled.button`
    font-weight: 600;
    font-size: 20px;
    color: ${({ $isAnswered }) => $isAnswered ? colors.gray1 : colors.gray3};
    background-color: ${({ $isAnswered }) => $isAnswered ? colors.mainColor : colors.gray2};
    border-radius: 8px;
    white-space: nowrap;
    width: 100%;
    height: 56px;
    pointer-events: ${({ $inVisible }) => $inVisible ? "none" : "auto"};
    opacity: ${({ $inVisible }) => $inVisible ? 0 : 1};
    font-family:'Pretendard-Regular';
`;

export default TestQna;
