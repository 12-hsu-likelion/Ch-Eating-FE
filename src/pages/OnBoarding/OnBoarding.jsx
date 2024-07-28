import React, { useState } from 'react';
import styled from 'styled-components';
import colors from "../../styles/colors";
import OnBoardingData from '../../utils/OnBoarding/OnBoardingData';
import { useNavigate } from 'react-router-dom';

const OnBoardingContainer = styled.div`
    width: 100%;
`;

const OnBoardingItem = styled.div`
    width: 100%;
`;

const OnBoardingBackground = styled.div`
    height: 63.2rem;
    padding-top: 12.4rem;
    width: 100%;
    background: linear-gradient(0deg, #2C0074 0%, rgba(44, 0, 116, 0.00) 100%);
    display: flex;
    justify-content: center;
`;

const OnBoardingImage = styled.img`
    width: 37.8rem;
    height: auto;
`;

const OnBoardingBottomContainer = styled.div`
    background-color: ${colors.backgroundColor};
    border: 0.1rem solid ${colors.gray2};
    width: 100%;
    min-height: calc(100vh - 63.2rem);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
`;

const BottomTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const OnBoardingTitle = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: ${colors.mainColor};
`;

const OnBoardingSubTitle = styled.p`
    font-size: 1.6rem;
    color: ${colors.gray6};
`;

const ButtonContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: ${props => props.disabled ? '10.4rem' : '2.4rem'};
    margin-bottom: 3.6rem;
`;

const CircleContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const Circle = styled.div`
    width: 1rem;
    height: 1rem;
    background-color: ${props => props.active == "true" ? colors.mainColor : colors.gray2};
    border: none;
    border-radius: 50%;
`;

const NextP = styled.p`
    font-size: 2rem;
    color: ${props => props.disabled ? colors.backgroundColor : colors.violet90};
    cursor: ${props => props.disabled ? '' : 'pointer'};
    white-space: nowrap;
`;

const LoginButton = styled.button`
    width: 80%;
    height: 5.6rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 2.9rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${colors.gray1};
    display: ${props => props.disabled ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 2.3rem;
`

const OnBoarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentIndex < OnBoardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentImageUrl = new URL(`../../assets/images/${OnBoardingData[currentIndex].imageUrl}`, import.meta.url).href;

    const splitSubtitle = OnBoardingData[currentIndex].subTitle.split('.').map((text, index) => (
        <React.Fragment key={index}>
            {text.trim()}
            {index < OnBoardingData[currentIndex].subTitle.split('.').length - 1 && <br />}
        </React.Fragment>
    ));

    const handleLoginClick = () => {
        navigate("/login");
    }

    return (
        <div className="pageContainer">
            <OnBoardingContainer>
                {OnBoardingData.length > 0 && (
                    <OnBoardingItem>
                        <OnBoardingBackground>
                            <OnBoardingImage src={currentImageUrl} alt={OnBoardingData[currentIndex].title} />
                        </OnBoardingBackground>

                        <OnBoardingBottomContainer>
                            <BottomTitleContainer>
                                <OnBoardingTitle>{OnBoardingData[currentIndex].title}</OnBoardingTitle>
                                <OnBoardingSubTitle>{splitSubtitle}</OnBoardingSubTitle>
                            </BottomTitleContainer>

                            <LoginButton disabled={currentIndex !== OnBoardingData.length - 1} onClick={handleLoginClick}>로그인/회원가입 하기</LoginButton>
                    
                            <ButtonContainer disabled={currentIndex !== OnBoardingData.length - 1}>
                                <NextP onClick={handlePrevious} disabled={currentIndex === 0}>이전</NextP>

                                <CircleContainer>
                                    {OnBoardingData.map((_, index) => (
                                        <Circle key={index} active={(currentIndex === index).toString()} />
                                    ))}
                                </CircleContainer>

                                <NextP onClick={handleNext} disabled={currentIndex === OnBoardingData.length - 1}>다음</NextP>
                            </ButtonContainer>
                        </OnBoardingBottomContainer>
                    </OnBoardingItem>
                )}
            </OnBoardingContainer>
        </div>
    );
};

export default OnBoarding;
