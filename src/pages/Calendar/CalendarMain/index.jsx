import { RxDotFilled } from 'react-icons/rx';

import * as S from './index.style';

import { DAYS } from '@/constants/calendar';

const CalendarMain = ({ currentYear, currentMonth, currentData }) => {
  const totalDate = new Date(currentYear, currentMonth, 0).getDate();
  const startdate = new Date(currentYear, currentMonth - 1, 1).getDay() + 1;

  console.log(currentData);
  return (
    <S.Container>
      <S.DayBox>
        {DAYS.map(day => (
          <S.Day key={day} day={day}>
            {day}
          </S.Day>
        ))}
      </S.DayBox>
      <S.DayBox>
        {Array.from(Array(totalDate).keys()).map(i => (
          <S.Date
            to={`/detail/${currentData[i + 1]?.id}`}
            key={`${i}-day`}
            date={i}
            startDate={startdate}
          >
            <S.DateTitle>
              <S.DateInfo date={i} startDate={startdate}>
                {i + 1}
              </S.DateInfo>
              <span>
                {currentData[i + 1] && <RxDotFilled color="#404F40" />}
              </span>
            </S.DateTitle>
            <S.Mood>{currentData[i + 1]?.mood}</S.Mood>
            {currentData[i + 1] && (
              <S.DescBox className="desc">{currentData[i + 1].desc}</S.DescBox>
            )}
          </S.Date>
        ))}
      </S.DayBox>
    </S.Container>
  );
};

export default CalendarMain;
