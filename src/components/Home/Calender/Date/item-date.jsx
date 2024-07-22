import styled from 'styled-components';
import colors from "../../../../styles/colors";
import ListBar from "../Bar/list-bar";

const DateContainer = styled.div`
    width: 5.7rem;
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: ${props => (props.isToday ? colors.violet10 : "white")};
    border-radius: ${props => props.isFirst ? '0 0 0 0.8rem' : props.isLast ? '0 0 0.8rem 0' : '0'};
    border: none;
`;
const DateItem = styled.div`
    margin-top: 0.2rem;
`;

const DayP = styled.p`
    font-size: 1rem;
    color: ${colors.gray4};
`;

const DateP = styled.p`
    font-size: 1.6rem;
    color: black;
    font-weight: 600;
`;

const ItemDate = ({date, day, isToday, isFirst, isLast}) => {
    return (
        <DateContainer isToday={isToday} isFirst={isFirst} isLast={isLast}>
                <DateItem>
                    <DayP>{day}</DayP>
                    <DateP>{date.getDate()}</DateP>
                    <ListBar />
                </DateItem>
        </DateContainer>
    );
};

export default ItemDate;
