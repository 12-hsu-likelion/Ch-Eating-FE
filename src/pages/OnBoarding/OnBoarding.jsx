import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from "../../styles/colors";
import OnBoardingData from '../../utils/OnBoarding/OnBoardingData';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const bounce = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-0.5rem);
    }
    100% {
        transform: translateY(0);
    }
`;

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
    transition: opacity 1s;
    ${props => props.fade === 'out' && css`
        animation: ${fadeOut} 1s forwards;
    `}
    ${props => props.fade === 'in' && css`
        animation: ${fadeIn} 1s forwards;
    `}
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
    transition: opacity 1s;
    ${props => props.fade === 'out' && css`
        animation: ${fadeOut} 1s forwards;
    `}
    ${props => props.fade === 'in' && css`
        animation: ${fadeIn} 1s forwards;
    `}
`;

const OnBoardingTitle = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: ${colors.mainColor};
    ${props => props.animate === 'true' && css`
        animation: ${bounce} 1s ease-in-out;
    `};
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
    background-color: ${props => props.active === "true" ? colors.mainColor : colors.gray2};
    border: none;
    border-radius: 50%;
`;

const NextP = styled.p`
    font-size: 2rem;
    color: ${props => props.disabled ? colors.backgroundColor : colors.violet90};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
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
    font-family:'Pretendard-Regular';

    ${props => props.fade === 'out' && css`
        animation: ${fadeOut} 1s forwards;
    `}
    ${props => props.fade === 'in' && css`
        animation: ${fadeIn} 1s forwards;
    `}
`;

const OnBoarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeState, setFadeState] = useState('in');
    const [nextIndex, setNextIndex] = useState(null);
    const [animateTitle, setAnimateTitle] = useState(false);
    const [fadeInStarted, setFadeInStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (fadeState === 'out') {
            const timer = setTimeout(() => {
                setCurrentIndex(nextIndex);
                setFadeState('in');
                setFadeInStarted(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [fadeState]);

    useEffect(() => {
        if (fadeState === 'in') {
            setFadeInStarted(true);
            const timer = setTimeout(() => {
                setAnimateTitle(true);
                const bounceTimer = setTimeout(() => {
                    setAnimateTitle(false);
                }, 1000);
                return () => clearTimeout(bounceTimer);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [fadeState]);

    const handleNext = () => {
        if (currentIndex < OnBoardingData.length - 1) {
            setFadeState('out');
            setNextIndex((currentIndex + 1) % OnBoardingData.length);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setFadeState('out');
            setNextIndex((currentIndex - 1 + OnBoardingData.length) % OnBoardingData.length);
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
                            <OnBoardingImage
                                src={currentImageUrl}
                                alt={OnBoardingData[currentIndex].title}
                                fade={fadeState}
                            />
                        </OnBoardingBackground>

                        <OnBoardingBottomContainer>
                            <BottomTitleContainer fade={fadeState}>
                                <OnBoardingTitle animate={animateTitle ? 'true' : 'false'}>{OnBoardingData[currentIndex].title}</OnBoardingTitle>
                                <OnBoardingSubTitle>{splitSubtitle}</OnBoardingSubTitle>
                            </BottomTitleContainer>

                            <LoginButton fade={fadeState}  disabled={currentIndex !== OnBoardingData.length - 1} onClick={handleLoginClick}>로그인/회원가입 하기</LoginButton>
                    
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
