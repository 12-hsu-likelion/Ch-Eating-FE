import styled from "styled-components";
import colors from "../../../../styles/colors";

const InputContainer = styled.input`
    width: 100%;
    height: 2.8rem;
    border-bottom: 0.1rem solid ${colors.gray3};
    outline: none;
    font-size: 1.2rem;
    color: ${colors.black};
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 4.2rem;
`

const InputEdit = ({ onChange, value }) => {
    return (
        <InputContainer
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default InputEdit;