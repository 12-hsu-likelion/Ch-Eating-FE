import React from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../../../context/CalendarContext';

const BarGraph = () => {

    const { currentSelect } = useCalendarContext();
    const { selectedMonth } = currentSelect;

    const s = "11월";
    console.log(s.split(""));
    const tempDate = `${selectedMonth.year}-${(selectedMonth.month).split(/[^0-9]/).replace("")}-01`;
    console.log(tempDate);


    return (
        <StyledBarGraph>

        </StyledBarGraph>
    );
};

const StyledBarGraph = styled.ul`
    max-height: 100px;
    display: flex;

    li{
        flex: 1;
        border: 1px solid red;
        text-align: center;
        color: #9FA4A8;
        font-size: 10px;
    }
`

export default BarGraph;