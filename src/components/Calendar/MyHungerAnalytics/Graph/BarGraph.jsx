import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../../../context/CalendarContext';
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';

const BarGraph = () => {
    const { currentSelect } = useCalendarContext();
    const { selectedMonth } = currentSelect;

    const tempDate = useMemo(() => new Date(`${selectedMonth.year}-${(selectedMonth.month).split(/[^0-9]/)[0]}-01`), [selectedMonth]);

    const startCurrentMonth = useMemo(() => startOfMonth(tempDate), [tempDate]);
    const endCurrentMonth = useMemo(() => endOfMonth(tempDate), [tempDate]);

    const firstDayOfFirstWeek = useMemo(() => format(startOfWeek(startCurrentMonth, { weekStartsOn: 1 }), "yyyy-MM-dd"), [startCurrentMonth]);
    const lastDayOfLastWeek = useMemo(() => format(endOfWeek(endCurrentMonth, { weekStartsOn: 1 }), "yyyy-MM-dd"), [endCurrentMonth]);

    console.log(firstDayOfFirstWeek, lastDayOfLastWeek);

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
