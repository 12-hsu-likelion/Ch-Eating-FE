import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from "gsap";
import { useCalendarContext } from "../../../../context/CalendarContext";

const data = {
    "daily": {
        "totalFakeHungerOccurrences": 3,
        "totalFakeHungerFailures": 1,
        "fakeHungerTimeDistribution": {
            "00": 0,
            "01": 27,
            "02": 0,
            "03": 0,
            "04": 0,
            "05": 14,
            "06": 0,
            "07": 0,
            "08": 5,
            "09": 0,
            "10": 0,
            "11": 0,
            "12": 0,
            "13": 0,
            "14": 0,
            "15": 0,
            "16": 0,
            "17": 0,
            "18": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 0
        }
    },
    "weekly": {
        "totalFakeHungerOccurrences": 15,
        "totalFakeHungerFailures": 5,
        "fakeHungerTimeDistribution": {
            "00": 7,
            "01": 2,
            "02": 0,
            "03": 3,
            "04": 9,
            "05": 1,
            "06": 1,
            "07": 0,
            "08": 4,
            "09": 1,
            "10": 1,
            "11": 1,
            "12": 1,
            "13": 2,
            "14": 1,
            "15": 1,
            "16": 0,
            "17": 1,
            "18": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 1
        }
    },
    "monthly": {
        "totalFakeHungerOccurrences": 60,
        "totalFakeHungerFailures": 20,
        "fakeHungerTimeDistribution": {
            "00": 12,
            "01": 10,
            "02": 8,
            "03": 7,
            "04": 15,
            "05": 11,
            "06": 5,
            "07": 18,
            "08": 22,
            "09": 9,
            "10": 13,
            "11": 10,
            "12": 16,
            "13": 17,
            "14": 14,
            "15": 7,
            "16": 11,
            "17": 5,
            "18": 14,
            "19": 8,
            "20": 15,
            "21": 5,
            "22": 3,
            "23": 4
        }
    }
}


const PieGraph = ({type}) => {
    const canvasRef = useRef();
    const { currentSelect } = useCalendarContext();
    // 반드시 data값을(아마 위처럼 오브젝트 형식으로 올텐데) 배열로 변환할 것
    const dataArray = Object.values(data[type].fakeHungerTimeDistribution);

    // 밑의 의존성 배열에는 데이터 값을 넣어야 함
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const radius = canvas.width / 2;
        const segmentAngle = (2 * Math.PI) / 24;

        const max = Math.max(...dataArray);

        const colors = dataArray.map(e => {
            const saturation = (e / max) * 100;
            const saturation2 = 17 - (e * 17 / max);
            // 0부터 10까지의 값이 있다고 치면 17을 나눠야 함 10일 때는 0을 가지고, 0일때는 17을 가져야해
            return `hsl(0, ${saturation}%, ${saturation2 + 63}%)`;
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(radius, radius);

        for (let i = 0; i < 24; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, i * segmentAngle, (i + 1) * segmentAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
        }

        ctx.translate(-radius, -radius);

        gsap.from(".pie-graph", {
            opacity: 0,
            scale: 0,
            delay: .2
        })
    }, [currentSelect.selectedWeek]);

    return (
        <StyledPieGraph className='pie-graph' width={180} height={180} ref={canvasRef}>

        </StyledPieGraph>
    );
};

const StyledPieGraph = styled.canvas`
    border-radius: 50%;
`;

export default PieGraph;