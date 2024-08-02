import styled from "styled-components";
import colors from "../../../../styles/colors";

const Bar = styled.div`
    width: 100%;
    height: 0.6rem;
    border: none;
    border-radius: 5rem;
    background-color: ${props => {
        if (props.testresult === '진짜 배고픔') {
            return colors.subColor;
        } else if (props.testresult === '가짜 배고픔') {
            return colors.error;
        }
    }};
`;

const ItemBar = ({ testresult }) => {
    return (
        <Bar testresult={testresult} />
    );
};

export default ItemBar;
