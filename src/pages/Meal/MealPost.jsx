import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import InputPost from "../../components/Meal/MealPost/Input/input-post";
import ListType from "../../components/Meal/MealPost/Type/list-type";

const MealContainer = styled.div`
    width: 90%;
    padding-top: 8.6rem;
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

const MealPost = () => {
    const [postType, setPostType] = useState("");

    const handleTypeSelect = (type) => {
        setPostType(type);
    };

    useEffect(() => {
        console.log(postType);
    }, [postType]);

    return (
        <div className="pageContainer" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <MealContainer>
                <MealTitle>식사량 기록</MealTitle>
                <MealTitle2>식사량을 기록하고 과식을 방지하세요.</MealTitle2>

                <PostContainer>
                    <MealPostP>브랜드명</MealPostP>
                    <InputPost />

                    <MealPostP>종류</MealPostP>
                    <ListType onTypeSelect={handleTypeSelect} />
                    
                    <MealPostP>메뉴명</MealPostP>
                    <InputPost />

                    <MealPostP>식사량</MealPostP>
                    <InputPost />

                    <MealPostP>세부사항</MealPostP>
                    <InputPost />
                </PostContainer>
            </MealContainer>
        </div>
    )
}

export default MealPost;