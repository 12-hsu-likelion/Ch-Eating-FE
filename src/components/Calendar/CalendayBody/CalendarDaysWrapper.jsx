import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useCalendarContext } from '../../../context/CalendarContext';
import CalendarDay from './CalendarDay';
import { format } from 'date-fns';
import { useGetMonthData } from '../../../hooks/useAsync';
import { useNavigate } from 'react-router-dom';

const CalendarDaysWrapper = () => {
    const navigate = useNavigate();

    const {daysInMonth, currentDate} = useCalendarContext();
    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd');

    const {year, month} = currentDate;

    const [monthState, monthFetchData] = useGetMonthData(Number(year), Number(month));

    useLayoutEffect(()=>{
        monthFetchData();
    }, [month]);

    // 밑의 dayInfo는 통신으로 받은 day의 정보가 아님 
    const gotoDetailedAnalyticsPage = (dayInfo) => {
        
        navigate(`/detailedanalytics/${dayInfo.date}`, {
            state: {
                dayInfo
            }
        });
    }

    if(monthState.loading){
        // return <StyledLoading>로딩중...</StyledLoading>
        return;
    }

    const transformedData = monthState.data.reduce((acc, item) => {
      const { createDate } = item;
      
      if (!acc[createDate]) {
          acc[createDate] = [];
      }
      
      acc[createDate].push(item);
      
      return acc;
  }, {});

    return (
        <StyledCalendarDayWrapper>
            {daysInMonth.map((dayInfo, i)=>{
                return <CalendarDay data = {transformedData[dayInfo.date]} gotoDetailedAnalyticsPage = {gotoDetailedAnalyticsPage} isCurrent = {formattedDate === dayInfo.date} isPrevMonth = {dayInfo.month !== currentDate.month} key={i} dayInfo = {dayInfo} />
            })}
        </StyledCalendarDayWrapper>
    );
};

const StyledLoading = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 20px;
`;

const StyledCalendarDayWrapper = styled.ul`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    min-height: 380px;
`;

export default CalendarDaysWrapper;


// const testResults = [
//   { userId: 'test123', testId: 1, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-01' },
//   { userId: 'test123', testId: 2, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-01' },
//   { userId: 'test123', testId: 3, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-02' },
//   { userId: 'test123', testId: 4, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-02' },
//   { userId: 'test123', testId: 5, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-03' },
//   { userId: 'test123', testId: 6, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-03' },
//   { userId: 'test123', testId: 7, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-03' },
//   { userId: 'test123', testId: 8, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-04' },
//   { userId: 'test123', testId: 9, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-05' },
//   { userId: 'test123', testId: 10, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-06' },
//   { userId: 'test123', testId: 11, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-07' },
//   { userId: 'test123', testId: 12, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-08' },
//   { userId: 'test123', testId: 13, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-08' },
//   { userId: 'test123', testId: 14, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-09' },
//   { userId: 'test123', testId: 15, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-10' },
//   { userId: 'test123', testId: 16, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-11' },
//   { userId: 'test123', testId: 17, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-12' },
//   { userId: 'test123', testId: 18, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-13' },
//   { userId: 'test123', testId: 19, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-13' },
//   { userId: 'test123', testId: 20, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-14' },
//   { userId: 'test123', testId: 21, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-15' },
//   { userId: 'test123', testId: 22, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-16' },
//   { userId: 'test123', testId: 23, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-17' },
//   { userId: 'test123', testId: 24, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-18' },
//   { userId: 'test123', testId: 25, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-19' },
//   { userId: 'test123', testId: 26, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-20' },
//   { userId: 'test123', testId: 27, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-21' },
//   { userId: 'test123', testId: 28, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-22' },
//   { userId: 'test123', testId: 29, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-23' },
//   { userId: 'test123', testId: 30, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-24' },
//   { userId: 'test123', testId: 31, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-25' },
//   { userId: 'test123', testId: 32, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-26' },
//   { userId: 'test123', testId: 33, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-27' },
//   { userId: 'test123', testId: 34, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-28' },
//   { userId: 'test123', testId: 35, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-29' },
//   { userId: 'test123', testId: 36, testName: '식후 배고픔 테스트', testResult: '가짜 배고픔', testWin: null, createTime: '2024-08-30' },
//   { userId: 'test123', testId: 37, testName: '식전 배고픔 테스트', testResult: '진짜 배고픔', testWin: null, createTime: '2024-08-31' }
// ];
