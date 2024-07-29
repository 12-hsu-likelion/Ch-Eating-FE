import colors from "../../../../styles/colors";
import styled from "styled-components";

const BeforeContainer = styled.div`
    width: 100%;
    height: 2.8rem;
    background-color: ${props => (props.istruehunger === "true" ? colors.subColor : colors.error)};
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
    margin-bottom:  ${props => (props.istruehunger === "true" ? "0.5rem" : "0rem")};
`;

const BeforeP = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => (props.istruehunger === "true" ? colors.gray6 : colors.gray1)};
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
`

const QnaButton = styled.button`
    width: 20%;
    height: 2.6rem;
    background-color: ${colors.violet10};
    border: none;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    color: ${colors.gray4};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
`

const Before = ({ data }) => {
    const istruehunger = data.completed === true;
    const hungerStatus = istruehunger ? "진짜 배고픔" : "가짜 배고픔";

    return (
        <>
            <BeforeContainer istruehunger={istruehunger.toString()}>
                <BeforeP istruehunger={istruehunger.toString()}>식전 배고픔 테스트: {hungerStatus}</BeforeP>
            </BeforeContainer>

            {!istruehunger && (
                <FalseContainer>
                    <BeforeP style={{ color: colors.black }}>배고픔을 이겨냈나요?</BeforeP>
                    <ButtonContainer>
                        <QnaButton>네</QnaButton>
                        <QnaButton>아니요</QnaButton>
                    </ButtonContainer>
                </FalseContainer>
            )}
        </>
    );
}

export default Before;
