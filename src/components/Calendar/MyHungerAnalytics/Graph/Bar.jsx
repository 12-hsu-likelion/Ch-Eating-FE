import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import colors from '../../../../styles/colors';
import { useCalendarContext } from '../../../../context/CalendarContext';
import gsap from 'gsap';

const Bar = ({ max, data }) => {
    // 최대 높이는 46픽셀
    // 46픽셀을 max로 나눈 후 data를 곱한 값을 높이에 주기
    const calculatedHeight = Math.floor((46 / max) * data);
    const { currentSelect } = useCalendarContext();
    const { selectedMonth } = currentSelect;

    const barRef = useRef(null);

    useEffect(() => {
        if (barRef.current) {
            gsap.fromTo(barRef.current,
                { height: 0 },
                { height: `${calculatedHeight}px`, duration: 0.5, ease: "power1.out" }
            );
        }
    }, [selectedMonth]);

    return (
        <StyledBar ref={barRef} />
    );
};

const StyledBar = styled.div`
    width: 14px;
    position: absolute;
    bottom: 15px; 
    background-color: ${colors.error};
    left: 50%;
    transform: translateX(-50%);
`;

export default Bar;
