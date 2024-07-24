import styled from "styled-components";
import colors from "../../../../styles/colors";
import SearchIcon from "../../../../assets/images/searchIcon.png";

const SearchContainer = styled.div`
    position: relative;
`

const InputContainer = styled.input`
    width: 100%;
    height: 4.8rem;
    border: none;
    border-radius: 2.8rem;
    background-color: ${colors.gray2};
    display: flex;
    align-items: center;
    padding: 0 5rem 0 2.4rem;
    box-sizing: border-box;
    font-size: 1.6rem;
    color: ${colors.black};
    margin-top: 1.2rem;
`;

const IconImg = styled.img`
    width: 3.76rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
`;

const InputMeal = ({ type, onChange, value }) => {
    return (
        <SearchContainer>
            <InputContainer 
                placeholder="식사기록 검색하기"
                type={type}
                onChange={onChange}
                value={value}
            />
            <IconImg src={SearchIcon} alt="searchIcon" />
        </SearchContainer>
    );
};

export default InputMeal;
