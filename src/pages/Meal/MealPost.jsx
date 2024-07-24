import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import InputPost from "../../components/Meal/MealPost/Input/input-post";
import ListType from "../../components/Meal/MealPost/Type/list-type";
import { useNavigate } from "react-router-dom";

const MealContainer = styled.div`
    width: 90%;
    padding-top: 8.6rem;
    margin-bottom: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const SubmitButton = styled.button`
    width: 70%;
    height: 4rem;
    background-color: ${colors.mainColor};
    border: none;
    border-radius: 3rem;
    color: ${colors.gray1};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const MealPost = () => {
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [postType, setPostType] = useState("");
    const [menuName, setMenuName] = useState("");
    const [mealAmount, setMealAmount] = useState("");
    const [details, setDetails] = useState("");

    const handleTypeSelect = (type) => {
        setPostType(type);
    };

    useEffect(() => {
        //console.log(postType);
    }, [postType]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", {
                brandName: brandName,
                postType: postType,
                menuName: menuName,
                mealAmount: mealAmount,
                details: details
            });
            console.log("통신 완료: ", response.data);
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
                    <InputPost value={brandName} onChange={setBrandName} />

                    <MealPostP>종류</MealPostP>
                    <ListType onTypeSelect={handleTypeSelect} />
                    
                    <MealPostP>메뉴명</MealPostP>
                    <InputPost value={menuName} onChange={setMenuName} />

                    <MealPostP>식사량</MealPostP>
                    <InputPost value={mealAmount} onChange={setMealAmount} />

                    <MealPostP>세부사항</MealPostP>
                    <InputPost value={details} onChange={setDetails} />
                </PostContainer>

                <SubmitButton onClick={handleSubmit}>제출 버튼</SubmitButton>
            </MealContainer>
        </div>
    )
}

export default MealPost;