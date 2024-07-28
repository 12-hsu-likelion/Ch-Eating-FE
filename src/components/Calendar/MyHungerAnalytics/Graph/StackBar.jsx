import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../../styles/colors';
import gsap from 'gsap';
import { useCalendarContext } from '../../../../context/CalendarContext';

const StackBar = () => {
    const { currentSelect } = useCalendarContext();

    useEffect(() => {
        gsap.fromTo(".stack-bar", {
            opacity: 0,

        }, {
            opacity: 1,
            stagger: .01
        })
    }, [currentSelect]);

    return (
        <StyledStackBar className='stack-bar'>

        </StyledStackBar>
    );
};

const StyledStackBar = styled.div`
    background-color: ${colors.error};
    height: 6px;
    width: 40px;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 4px;
`;

export default StackBar;