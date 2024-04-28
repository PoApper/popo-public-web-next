import moment from 'moment';
import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

const ReservationCalendar = ({
  markedDates,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <StyledCalendar
      formatDay={(_, date) => moment(date).format('DD')}
      onChange={(value) => setSelectedDate(moment(value).format('YYYYMMDD'))}
      defaultValue={moment(selectedDate).toDate()}
      view={'month'}
      prev2Label={null}
      next2Label={null}
      minDate={moment().subtract(1, 'month').startOf('month').toDate()}
      maxDate={moment().add(30, 'day').toDate()}
      tileContent={({ date }) => {
        let color = null;
        let height = null;
        let borderRadius = null;
        if (
          markedDates.find(
            (x) =>
              moment(x).format('YYYY-MM-DD') ===
              moment(date).format('YYYY-MM-DD'),
          )
        ) {
          color = '#f2711c';
        }
        if (
          markedDates.filter(
            (x) =>
              moment(x).format('YYYY-MM-DD') ===
              moment(date).format('YYYY-MM-DD'),
          ).length > 1
        ) {
          height = '8px';
          borderRadius = '50%';
        } else {
          height = '4px';
          borderRadius = '50%';
        }
        return <CellDot color={color} height={height} borderRadius={borderRadius}/>;
      }}
    />
  );
};

export default ReservationCalendar;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: 1px solid rgba(34, 36, 38, 0.15);
  font-size: 1.2rem;
`;

const CellDot = styled.div`
  height: ${(props) => props.height};
  width: 8px;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  margin: 2px auto;
`;
