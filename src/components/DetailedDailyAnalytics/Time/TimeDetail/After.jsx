import colors from "../../../../styles/colors";
import styled from "styled-components";

const AfterContainer = styled.div`
    width: 100%;
    height: 2.8rem;
    background-color: ${props => (props.istruehunger === "true" ? colors.subColor : colors.error)};
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
    margin-bottom:  ${props => (props.istruehunger === "true" ? "0.5rem" : "0rem")};
`;

const AfterP = styled.p`
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

const After = ({ data }) => {
    const istruehunger = data.completed === true;
    const hungerStatus = istruehunger ? "진짜 배고픔" : "가짜 배고픔";

    return (
        <>
            <AfterContainer istruehunger={istruehunger.toString()}>
                <AfterP istruehunger={istruehunger.toString()}>식후 배고픔 테스트: {hungerStatus}</AfterP>
            </AfterContainer>

            {!istruehunger && (
                <FalseContainer>
                    <AfterP style={{ color: colors.black }}>배고픔을 이겨냈나요?</AfterP>
                    <ButtonContainer>
                        <QnaButton>네</QnaButton>
                        <QnaButton>아니요</QnaButton>
                    </ButtonContainer>
                </FalseContainer>
            )}
        </>
    );
}

export default After;
