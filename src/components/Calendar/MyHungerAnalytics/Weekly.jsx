import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components';
import colors from '../../../styles/colors';
import PieGraph from './Graph/PieGraph';
import BarGraph from './Graph/BarGraph';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import { useCalendarContext } from '../../../context/CalendarContext';
import { useGetMonthlyStatics } from '../../../hooks/useAsync';

const Weekly = () => {

    const { currentSelect } = useCalendarContext();
    const { selectedMonth } = currentSelect;

    const tempDate = useMemo(() => new Date(`${selectedMonth.year}-${(selectedMonth.month).split(/[^0-9]/)[0].padStart(2, "0")}-01`), [selectedMonth]);

    const startCurrentMonth = useMemo(() => startOfMonth(tempDate), [tempDate]);
    const endCurrentMonth = useMemo(() => endOfMonth(tempDate), [tempDate]);

    const firstDayOfFirstWeek = useMemo(() => format(startOfWeek(startCurrentMonth, { weekStartsOn: 1 }), "yyyy-MM-dd"), [startCurrentMonth]);
    const lastDayOfLastWeek = useMemo(() => format(endOfWeek(endCurrentMonth, { weekStartsOn: 1 }), "yyyy-MM-dd"), [endCurrentMonth]);

    // console.log("현재 선택된 월의 첫 날과 끝 날: ", firstDayOfFirstWeek, lastDayOfLastWeek);

    // 통신 코드
    const [weeklyState, refetch] = useGetMonthlyStatics(firstDayOfFirstWeek, lastDayOfLastWeek);

    useLayoutEffect(() => {
        refetch();
    }, [selectedMonth]);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfFirstWeek,
        end: lastDayOfLastWeek
    }).map((day) => format(day, "M/d"));

    const calcWeeks = useCallback(() => {
        const result = [];

        for (let i = 0; i < daysInMonth.length; i += 7) {
            result.push(daysInMonth.slice(i, i + 7));
        }

        return result;
    }, [selectedMonth]);


    const weekChunks = useMemo(() => {
        return calcWeeks();
    }, [selectedMonth]);


    if(weeklyState.loading){
        return;
    }

    return (
        <StyledWeekly>
            <div className="bar-graph-wrapper">
                <h2>가짜 배고픔을 느낀 횟수</h2>
                <BarGraph weekChunks={weekChunks} data={weeklyState.data?.periodStatistics?.map(e=>e.totalFakeHungerOccurrences)} />
            </div>

            <div className="bar-graph-wrapper">
                <h2>가짜 배고픔에 속은 횟수</h2>
                <BarGraph weekChunks={weekChunks} data={weeklyState.data?.periodStatistics?.map(e=>e.totalFakeHungerFailures)} />
            </div>

            <div className="pie-graph-wrapper">
                <h2>가짜 배고픔을 느낀 시간대</h2>
                <div className="pie-graph-with-hours">
                    <PieGraph type={"monthly"} data={weeklyState.data?.totalFakeHungerTimeDistribution} />
                    <span className='time time-24'>24</span>
                    <span className='time time-6'>6</span>
                    <span className='time time-12'>12</span>
                    <span className='time time-18'>18</span>
                </div>
            </div>
        </StyledWeekly>
    );
};

const StyledWeekly = styled.div`
    h2{
        margin-bottom: 33px;
        font-weight: 400;
        font-size: 14px;
        color: ${colors.black};
    }

    .bar-graph-wrapper{
        margin-bottom: 60px;
    }

    .pie-graph-wrapper{
        margin-bottom: 100px;

        .pie-graph-with-hours{
            width: 220px;
            aspect-ratio: 1/1;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            .time{
                position: absolute;
                color: ${colors.gray5};
                font-size: 12px;
            }

            .time-24{
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-6{
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
            }

            .time-12{
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-18{
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
`

export default Weekly;