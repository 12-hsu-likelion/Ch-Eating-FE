import styled from "styled-components";
import colors from "../../../../styles/colors";
import { useNavigate } from 'react-router-dom';

const RealDeleteModalContainer = styled.div`
    width: 34rem;
    height: 18.6rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 0.8rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    padding-top: 6.4rem;
`

const RealDeleteP = styled.p`
    font-size: 2.4rem;
    color: white;
`

const RealDeleteButton = styled.button`
    width: 29.8rem;
    height: 3.6rem;
    border: none;
    border-radius: 0.4rem;
    background-color: ${colors.violet90};
    cursor: pointer;
    font-size: 1.6rem;
    color: ${colors.white};
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 4rem;
`

const RealDelete = () => {
    const navigate = useNavigate();

    const handleRealDelete = () => {
        console.log("진짜 탈퇴 안내 완료");

        navigate("/login");
    };
    return (
        <RealDeleteModalContainer>
            <RealDeleteP>탈퇴되었습니다</RealDeleteP>
            <RealDeleteButton onClick={handleRealDelete}>확인</RealDeleteButton>
        </RealDeleteModalContainer>
    )
}

export default RealDelete;