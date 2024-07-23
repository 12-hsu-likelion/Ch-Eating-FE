import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import colors from "../../styles/colors";
import TestBefore from "../../assets/images/testBefore.png";
import TestAfter from "../../assets/images/testAfter.png";

const TestContainer = styled.div`
    padding-top: 6.1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TypeContainer = styled.div`
    width: 85%;
`;

const TypeButton = styled.button`
    width: 50%;
    height: 4.8rem;
    background-color: ${props => props.active === "true" ? colors.mainColor : colors.gray1};
    cursor: pointer;
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.active === "true" ? colors.gray1 : colors.gray3};
    border: none;
`;

const BannerImg = styled.img`
    width: 92%;
`

const TestButton = styled.button`
    width: 92%;
    height: 5.6rem;
    background-color: ${colors.mainColor};
    border: 0.1rem solid ${colors.black};
    border-radius: 2.9rem;
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.gray1};
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 1.6rem 0 13rem 0;
    cursor: pointer;
`

const TestMain = () => {
    const [activeType, setActiveType] = useState('before');
    const navigate = useNavigate();

    const handleTestTypeClick = (type) => {
        setActiveType(type);
    };

    useEffect(() => {
        console.log(activeType);
    }, [activeType]);

    const handleTestButtonClick = () => {
        if (activeType === 'before') {
            navigate('/test/before');
        } else if (activeType === 'after') {
            navigate('/test/after');
        }
    };

    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center"}}>
            <TestContainer>
                <TypeContainer>
                    <TypeButton active={activeType === 'before' ? "true" : "false"} onClick={() => handleTestTypeClick('before')} style={{borderRadius: "1.6rem 0 0 0"}}>식전</TypeButton>
                    <TypeButton active={activeType === 'after' ? "true" : "false"} onClick={() => handleTestTypeClick('after')} style={{borderRadius: "0 1.6rem 0 0"}}>식후</TypeButton>
                </TypeContainer>

                {activeType === 'before' ? (
                    <BannerImg src={TestBefore} alt="before" />
                ) : (
                    <BannerImg src={TestAfter} alt="after" />
                )}

                <TestButton onClick={handleTestButtonClick}>테스트하기</TestButton>
            </TestContainer>
        </div>
    );
};

export default TestMain;
