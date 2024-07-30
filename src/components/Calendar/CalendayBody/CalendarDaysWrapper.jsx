import React, { useEffect } from 'react';
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

    const [monthState, monthFetchData] = useGetMonthData(`${year}-${month}`);

    // api가 개발 완료된다면 밑에 코드 풀기
    useEffect(()=>{
        // monthFetchData();
    }, [month]);

    // 밑의 dayInfo는 통신으로 받은 day의 정보가 아님 
    // 그냥 dayInfo만 받아와서 그 페이지에서 데이터를 get 요청해도 될 듯?
    const gotoDetailedAnalyticsPage = (dayInfo) => {
        
        navigate(`/detailedanalytics/${dayInfo.date}`, {
            state: {
                dayInfo
            }
        });
    }

    if(monthState.loading){
        return <StyledLoading>로딩중...</StyledLoading>
    }

    // 이거 나중에 통신 완료되면 temp가 아니라 monthState.data의 어쩌고로 바꿔야함
    const transformedData = temp.data.reduce((acc, item, i)=>{
        const { date, beforeTests, mealTimes, afterTests } = item;
        acc[date] = { beforeTests, mealTimes, afterTests };
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
`;

export default CalendarDaysWrapper;

// 그냥 임시적인 데이터
const temp = {
    "month": "2024-07",
    "data": [
      {
        "date": "2024-07-01",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "12:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:30",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "14:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-02",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "09:30",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "15:00",
            "result": "FAKE_HUNGER"
          },
          {
            "testTime": "18:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-03",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:30",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-04",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "14:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "16:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-05",
        "beforeTests": [
          {
            "testTime": "07:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:00",
          "12:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "08:30",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "18:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-06",
        "beforeTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "13:30",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-07",
        "beforeTests": [
          {
            "testTime": "08:30",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "19:30",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-08",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "11:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-09",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "15:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:30",
          "19:30"
        ],
        "afterTests": [
          {
            "testTime": "16:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-10",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "13:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "14:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-11",
        "beforeTests": [
          {
            "testTime": "12:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:30",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "15:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-12",
        "beforeTests": [
          {
            "testTime": "07:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "08:30",
            "result": "FAKE_HUNGER"
          },
          {
            "testTime": "18:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-13",
        "beforeTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "13:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-14",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "16:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:30",
          "19:30"
        ],
        "afterTests": [
          {
            "testTime": "17:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-15",
        "beforeTests": [
          {
            "testTime": "08:30",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "14:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-16",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "10:30",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-17",
        "beforeTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "13:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "18:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-18",
        "beforeTests": [
          {
            "testTime": "07:30",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:00",
          "13:00",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "09:30",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-19",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "11:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "17:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-20",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "REAL_HUNGER"
          },
          {
            "testTime": "15:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "13:00",
          "19:30"
        ],
        "afterTests": [
          {
            "testTime": "16:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-21",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:30",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-22",
        "beforeTests": [
          {
            "testTime": "08:30",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "12:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-23",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "10:30",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-24",
        "beforeTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:00",
          "12:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "12:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-25",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "13:00",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "14:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-26",
        "beforeTests": [
          {
            "testTime": "10:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "13:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "11:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-27",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "09:00",
          "12:30",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "10:00",
            "result": "FAKE_HUNGER"
          },
          {
            "testTime": "15:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-28",
        "beforeTests": [
          {
            "testTime": "11:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "08:00",
          "13:00",
          "18:00"
        ],
        "afterTests": [
          {
            "testTime": "13:00",
            "result": "REAL_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-29",
        "beforeTests": [
          {
            "testTime": "08:00",
            "result": "REAL_HUNGER"
          }
        ],
        "mealTimes": [
          "08:30",
          "12:00",
          "19:00"
        ],
        "afterTests": [
          {
            "testTime": "09:00",
            "result": "FAKE_HUNGER"
          }
        ]
      },
      {
        "date": "2024-07-30",
        "beforeTests": [
          {
            "testTime": "09:00",
            "result": "FAKE_HUNGER"
          }
        ],
        "mealTimes": [
          "09:30",
          "13:00",
          "18:30"
        ],
        "afterTests": [
          {
            "testTime": "10:00",
            "result": "REAL_HUNGER"
          }
        ]
      }
    ]
  };
