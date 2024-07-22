import styled from "styled-components";
import colors from "../../../../styles/colors";

const Bar = styled.div`
    width: 100%;
    height: 0.6rem;
    border: none;
    border-radius: 5rem;
    background-color: ${colors.subColor};
`

const ItemBar = () => {
    return (
        <Bar />
    )
}

export default ItemBar;