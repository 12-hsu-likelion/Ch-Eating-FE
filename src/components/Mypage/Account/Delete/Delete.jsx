import styled from "styled-components";
import colors from "../../../../styles/colors";
import DeleteIcon from "../../../../assets/images/DeleteIcon.png";
import { API } from "../../../../api/axios";

const DeleteModalContainer = styled.div`
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
    padding-top: 1rem;
`

const ImgContainer = styled.div`
    margin-left: 5rem;
`

const DeleteImg = styled.img`
    width: 11.4rem;
`

const DeleteP = styled.p`
    font-size: 2.4rem;
    color: white;
    margin-top: 1.5rem;
`

const DeleteButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 2.1rem;
`

const DeleteButton = styled.button`
    width: 14.4rem;
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
`

const Delete = ({ onDeleteConfirm, onDeleteCancel }) => {
    const handleDeleteConfirm = async () => {
        //console.log("회원 탈퇴 진행할 것임");
        try {
            const response = await API.delete("/api/users/delete");
            //console.log("회원 탈퇴 서버 통신 성공: ", response.data);
            localStorage.clear();
            onDeleteConfirm();

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteCancel = () => {
        //console.log("회원 탈퇴 안함. 모달창 다시 닫음");
        onDeleteCancel();
    };

    return (
        <DeleteModalContainer>
            <ImgContainer>
                <DeleteImg src={DeleteIcon} alt="delete" />
            </ImgContainer>

            <DeleteP>정말 탈퇴하시겠습니까?</DeleteP>

            <DeleteButtonContainer>
                <DeleteButton onClick={handleDeleteConfirm}>네</DeleteButton>
                <DeleteButton onClick={handleDeleteCancel}>아니오</DeleteButton>
            </DeleteButtonContainer>
        </DeleteModalContainer>
    )
}

export default Delete;