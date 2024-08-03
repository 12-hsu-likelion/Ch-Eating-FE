import colors from "../../styles/colors";
import styled from "styled-components";
import notFound from "../../assets/images/notFound.png";
import notFound2 from "../../assets/images/notFound2.png";
import { useNavigate } from "react-router-dom";

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ImgContainer = styled.div`
    position: relative;
    width: 16.8rem;
`

const NotFoundImg = styled.img`
    width: 100%;
`

const NotFoundImg2 = styled.img`
    width: 8.898rem;
    position: absolute;
    left: 13rem;
`

const PContainer = styled.div`
    text-align: center;
    margin-top: 4.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`

const NotFoundP = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: white;
`

const HomeButton = styled.button`
    width: 10rem;
    height: 4rem;
    background-color: ${colors.violet90};
    border: none;
    border-radius: 5rem;
    font-size: 1.6rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin-top: 4.1rem;
`

const NotFound = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/home");
    }

    return (
        <div className="pageContainer" style={{backgroundColor: colors.mainColor, height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ContentContainer>
                <ImgContainer>
                    <NotFoundImg src={notFound} alt="notFound" />
                    <NotFoundImg2 src={notFound2} alt="notFound" />
                </ImgContainer>

                <PContainer>
                    <NotFoundP>NOTFOUND</NotFoundP>
                    <NotFoundP style={{fontSize: "1.6rem", fontWeight: "400"}}>페이지 주소가 잘못되었어요</NotFoundP>
                </PContainer>

                <HomeButton onClick={handleHomeClick}>HOME</HomeButton>
            </ContentContainer>
        </div>
    )
}

export default NotFound;