import styled from 'styled-components';
import colors from "../../../../styles/colors";
import ListBar from "../Bar/list-bar";

const DateContainer = styled.div.attrs(props => ({
    istoday: props.istoday ? "true" : undefined,
    isfirst: props.isfirst ? "true" : undefined,
    islast: props.islast ? "true" : undefined
}))`
    width: calc(100% / 7);
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: ${props => (props.istoday ? colors.violet10 : "white")};
    border-radius: ${props => props.isfirst ? '0 0 0 0.8rem' : props.islast ? '0 0 0.8rem 0' : '0'};
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

const ItemDate = ({date, day, istoday, isfirst, islast}) => {
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate);

    return (
        <DateContainer istoday={istoday} isfirst={isfirst} islast={islast}>
                <DateItem>
                    <DayP>{day}</DayP>
                    <DateP>{date.getDate()}</DateP>
                    <ListBar date={formattedDate}/>
                </DateItem>
        </DateContainer>
    );
};

export default ItemDate;
