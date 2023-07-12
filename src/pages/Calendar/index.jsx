import { useEffect, useState } from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarMain from './CalendarMain';
import * as S from './index.style';

import { getdiaryLisyByCalendar } from '@/apis/request/diary';
import useError from '@/hooks/useError';
import { convertDiaryData } from '@/utils/diaries';

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [diaryCount, setDiaryCount] = useState(0);
  const [currentData, setCurrentData] = useState({});
  const [yearSelect, setYearSelect] = useState(false);
  const [monthSelect, setMonthSelect] = useState(false);

  const handleError = useError();

  useEffect(() => {
    getdiaryLisyByCalendar(currentYear, currentMonth)
      .then(diaries => {
        const [convertedDiaries, count] = convertDiaryData(
          diaries,
          currentYear,
          currentMonth,
        );
        setDiaryCount(count);
        setCurrentData(convertedDiaries);
      })
      .catch(err => handleError(err.code));
  }, [currentMonth, currentYear, handleError]);

  const moveNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);

      return;
    }
    setCurrentMonth(currentMonth + 1);
  };
  const movePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);

      return;
    }
    setCurrentMonth(currentMonth - 1);
  };

  const changeDate = type => e => {
    switch (type) {
      case 'year':
        setCurrentYear(e.target.value);
        setYearSelect(false);

        return;
      case 'month':
        setCurrentMonth(e.target.value);
        setMonthSelect(false);

        return;
      default:
        return;
    }
  };

  const toggleSelect = type => e => {
    e.stopPropagation();
    switch (type) {
      case 'year':
        setYearSelect(!yearSelect);
        setMonthSelect(false);

        return;
      case 'month':
        setMonthSelect(!monthSelect);
        setYearSelect(false);

        return;
      default:
        setMonthSelect(false);
        setYearSelect(false);

        return;
    }
  };

  return (
    <S.Container onClick={toggleSelect()}>
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        moveNextMonth={moveNextMonth}
        movePrevMonth={movePrevMonth}
        yearSelect={yearSelect}
        monthSelect={monthSelect}
        toggleSelect={toggleSelect}
        changeDate={changeDate}
        diaryCount={diaryCount}
      />
      <CalendarMain
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentData={currentData}
      />
    </S.Container>
  );
};

export default Calendar;
