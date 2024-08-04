import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from "gsap";
import { useCalendarContext } from "../../../../context/CalendarContext";

const PieGraph = ({ type, data }) => {
    const canvasRef = useRef();
    const { currentSelect } = useCalendarContext();

    // 밑의 의존성 배열에는 데이터 값을 넣어야 함
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const radius = canvas.width / 2;
        const segmentAngle = (2 * Math.PI) / data.length;
        const startAngle = -Math.PI / 2;

        const max = Math.max(...data);

        const colors = data.map(e => {
            if(max === 0){
                return "hsl(220, 8%, 92%)";
            }
                
            const saturation = (e / max) * 100;
            const saturation2 = 17 - (e * 17 / max);
            // 0부터 10까지의 값이 있다고 치면 17을 나눠야 함 10일 때는 0을 가지고, 0일때는 17을 가져야해
            return `hsl(0, ${saturation}%, ${saturation2 + 63}%)`;
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(radius, radius);

        data.forEach((_, i) => {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startAngle + (i * segmentAngle), startAngle + ((i + 1) * segmentAngle));
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
        });

        ctx.translate(-radius, -radius);

        gsap.from(".pie-graph", {
            opacity: 0,
            scale: 0,
            delay: .2
        })
    }, [type === "weekly" ? currentSelect.selectedWeek : currentSelect.selectedMonth]);

    return (
        <StyledPieGraph className='pie-graph' width={180} height={180} ref={canvasRef}>

        </StyledPieGraph>
    );
};

const StyledPieGraph = styled.canvas`
    border-radius: 50%;
`;

export default PieGraph;