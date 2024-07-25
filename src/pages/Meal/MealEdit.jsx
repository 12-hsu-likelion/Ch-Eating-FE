import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import InputEdit from "../../components/Meal/MealEdit/Input/input-edit";
import ListType from "../../components/Meal/MealEdit/Type/list-type";

const MealContainer = styled.div`
    width: 90%;
    padding-top: 8.6rem;
    margin-bottom: 10rem;
    display: flex;
    flex-direction: column;
`

const MealTitle = styled.p`
    font-size: 1.2rem;
    color: ${colors.gray5};
`

const MealTitle2 = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: ${colors.black};
    margin-top: 0.8rem;
`

const PostContainer = styled.div`
    margin-top: 6.1rem;
    width: 100%;
`

const MealPostP = styled.p`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colors.gray5};
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const EditButton = styled.button`
    width: 48.5%;
    height: 5.6rem;
    background-color: ${({ disabled }) => (disabled ? colors.gray2 : colors.mainColor)};
    border: none;
    border-radius: 0.8rem;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ disabled }) => (disabled ? colors.gray3 : colors.gray1)};
`

const MealEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [brandName, setBrandName] = useState("");
    const [postType, setPostType] = useState("");
    const [menuName, setMenuName] = useState("");
    const [mealAmount, setMealAmount] = useState("");
    const [details, setDetails] = useState("");
    const [form, setForm] = useState(false);

    // 정보 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                const editData = response.data;
                setBrandName(editData.name);
                setPostType(editData.id);
                setMenuName(editData.username);
                setMealAmount(editData.id);
                setDetails(editData.email);
                setForm(true);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, [id]); 


    const handleTypeSelect = (type) => {
        setPostType(type);
    };

    useEffect(() => {
        //console.log(postType);
    }, [postType]);

    useEffect(() => {
        if (brandName && postType && menuName && mealAmount && details) {
            setForm(true);
        } else {
            setForm(false);
        }
    }, [brandName, postType, menuName, mealAmount, details]);


    // 삭제 통신
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            console.log("삭제 통신 완료: ", response.data);
            navigate("/meal");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 수정 통신
    const handleEdit = async () => {
        try {
            const response = await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                brandName: brandName,
                postType: postType,
                menuName: menuName,
                mealAmount: mealAmount,
                details: details
            });
            console.log("수정 통신 완료: ", response.data);
            navigate("/meal");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="pageContainer" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <MealContainer>
                <MealTitle>식사량 기록</MealTitle>
                <MealTitle2>식사량을 기록하고 과식을 방지하세요.</MealTitle2>

                <PostContainer>
                    <MealPostP>브랜드명</MealPostP>
                    <InputEdit value={brandName} onChange={setBrandName} />

                    <MealPostP>종류</MealPostP>
                    <ListType onTypeSelect={handleTypeSelect} initTypeSelect={postType}/>
                    
                    <MealPostP>메뉴명</MealPostP>
                    <InputEdit value={menuName} onChange={setMenuName} />

                    <MealPostP>식사량</MealPostP>
                    <InputEdit value={mealAmount} onChange={setMealAmount} />

                    <MealPostP>세부사항</MealPostP>
                    <InputEdit value={details} onChange={setDetails} />
                </PostContainer>

                <ButtonContainer>
                    <EditButton onClick={handleDelete}>삭제하기</EditButton>
                    <EditButton disabled={!form} onClick={handleEdit}>수정하기</EditButton>
                </ButtonContainer>
            </MealContainer>
        </div>
    )
}

export default MealEdit;