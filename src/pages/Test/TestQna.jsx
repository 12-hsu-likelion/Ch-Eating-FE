import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../../styles/colors';
import styled from "styled-components";
import questionType from "../../components/Test/TestQuestion";
import TestNumber from '../../components/Test/TestNumber';
import dropDown from "../../assets/images/drop_down.png";

const TestQna = () => {
    const { activeType } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(activeType === "before" ? questionType.before : questionType.after);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [fakeHungerScore, setFakeHungerScore] = useState(0);

    const [beforeAnswer, setBeforeAnswer] = useState({
        dropDownOn: false,
        currentTime: 0,
        userInputTime: 0,
        ampm: "AM",
    });

    useEffect(()=>{
        const now = new Date();
        console.log(now.getTime());
    }, []);

    function ampmClick(e){

        setBeforeAnswer(prev=>({
            ...prev,
            dropDownOn: !prev.dropDownOn,
            ampm: e.target.textContent
        }))
    }

    return (
        <StyledTestQna>
            <div className="title">
                {activeType === "before" ? (
                    "식전 테스트"
                ) : (
                    "식후 테스트"
                )}
            </div>
            <div className="order">
                {questions.map((_, i) => {
                    return <TestNumber key={i} number={i + 1} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}>{i}</TestNumber>
                })}
            </div>

            <div className="question-content">
                <p style={{
                    marginTop: "98px",
                    marginBottom: "10px"
                }}>질문</p>
                <h4 className='question'>{questions[currentQuestion - 1]}</h4>
                <p style={{
                    marginBottom: "45px"
                }}>답변</p>
                <div className="answer-wrapper">
                    {activeType === "before" && currentQuestion === 1 && (
                        <>
                        <ul className='drop-down'>
                            <li onClick={ampmClick}>{beforeAnswer.ampm}</li>
                           {beforeAnswer.dropDownOn && (
                             <li onClick={ampmClick}>{beforeAnswer.ampm === "AM" ? "PM" : "AM"}</li>
                           )}
                            <div className="img-wrapper">
                                <img src={dropDown} alt="" />
                            </div>
                        </ul>
                        <div className="time-input-wrapper">
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                        </div>
                        </>
                    )}
                </div>
            </div>
        </StyledTestQna>
    )
}

const StyledTestQna = styled.section`
    margin: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title{
        margin-top: 89px;
        font-size: 16px;
        font-weight: 600;
        color: ${colors.gray6};
        margin-bottom: 26px;
    }

    .order{
        display: flex;
        gap: 26px;
        margin-bottom: 21px;
    }

    .question-content{
        border-radius: 8px;
        border: .5px solid ${colors.gray2};
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > p {
            color: #9FA4A8;
            font-weight: 600;
            font-size: 16px;
        }
        
        .question{
            white-space: pre-line;
            text-align: center;
            color: ${colors.black};
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 93px;
        }

        .answer-wrapper{
            display: flex;

            .drop-down{
                position: relative;
                
                li{
                    cursor: pointer;
                    color: #9FA4A8;
                    font-size: 16px;
                    padding: 9px 50px 9px 20px;
                    border: 0.5px solid ${colors.gray2};
                    border-radius: 4px;
                }

                .img-wrapper{
                    width: 15px;
                    aspect-ratio: 1/1;
                    position: absolute;
                    z-index: -1;
                    right: 19px;
                    top: 11.5px;

                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }
                }
            }
        }
    }
`;

export default TestQna;
