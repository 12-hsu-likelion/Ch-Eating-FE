import styled from "styled-components";
import colors from "../../../../styles/colors";
import { useNavigate } from 'react-router-dom';

const LogoutModalContainer = styled.div`
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

const LogoutP = styled.p`
    font-size: 2.4rem;
    color: white;
`

const LogoutButton = styled.button`
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

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <LogoutModalContainer>
            <LogoutP>로그아웃 되었습니다</LogoutP>
            <LogoutButton onClick={handleLogout}>확인</LogoutButton>
        </LogoutModalContainer>
    )
}

export default Logout;