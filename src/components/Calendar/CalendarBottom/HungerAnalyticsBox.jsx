import React from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useCalendarContext } from '../../../context/CalendarContext';

const HungerAnalyticsBox = ({type, data = "로딩중"}) => {
    const {currentSelect} = useCalendarContext();
    const {isWeeklySelected, selectedWeek, selectedMonth} = currentSelect;
    const navigate = useNavigate();

    // 만약에 지금이 주간 선택이라면 보내야할 데이터는 selectedWeek
    // 월간 선택이라면 보내야할 데이터는 selectedMonth

    const dayMapping = {
        "MONDAY": "월요일",
        "TUESDAY": "화요일",
        "WEDNESDAY": "수요일",
        "THURSDAY": "목요일",
        "FRIDAY": "금요일",
        "SATURDAY": "토요일",
        "SUNDAY": "일요일"
      };

    if(dayMapping[data]){
        data = dayMapping[data];
    }
    
    const sendData = isWeeklySelected ? selectedWeek[selectedWeek.length - 1].date : `${selectedMonth.year}-${selectedMonth.month.replace("월", "").toString().padStart("2", 0)}-01`;
    return (
        <StyledHungerAnalyticsBox onClick={()=>navigate("/myhungeranalytics", {
            state: {
                sendData
            }
        })}>
            <div className="analytics-type">
                {type}
            </div>
            <span>{data ? data : "없음"}</span>
        </StyledHungerAnalyticsBox>
    );
};

const StyledHungerAnalyticsBox = styled.li`
    flex: 1;
    min-height: 168px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 29px;
    border-radius: 4px;
    border: .5px solid ${colors.gray2};
    background-color: ${colors.gray1};
    cursor: pointer;
    transition: .5s ease;

    &:active{
        background-color: ${colors.gray2};
        transform: scale(1.03);
        border: .5px solid #d3dbe2;
    }

    .analytics-type{
        margin-top: 53px;
        margin-bottom: 14px;
        width: max-content;
        white-space: pre-wrap;
        font-size: 12px;
        color: ${colors.gray6};
    }

    span{
        font-size: 16px;
        color: ${colors.mainColor};
        font-weight: 600;
    }
`

export default HungerAnalyticsBox;