import styled from "styled-components";
import colors from "../../../../styles/colors";

const Bar = styled.div`
    width: 100%;
    height: 0.6rem;
    border: none;
    border-radius: 5rem;
    background-color: ${props => {
        if (props.testWin === '승리') {
            return colors.subColor;
        } else if (props.testWin === '패배') {
            return colors.error;
        }
    }};
`;

const ItemBar = ({ testWin }) => {
    return (
        <Bar testWin={testWin} />
    );
};

export default ItemBar;
