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
        let crowded = null;
        if (
          markedDates.find(
            (x) =>
              moment(x).format('YYYY-MM-DD') ===
              moment(date).format('YYYY-MM-DD'),
          )
        ) {
          color = '#f2711c';
        }
        crowded = markedDates.filter(
          (x) =>
            moment(x).format('YYYY-MM-DD') ===
            moment(date).format('YYYY-MM-DD'),
        ).length;
        if (crowded > 4) {
          return (
            <CellDot
              color={color}
              width={'8px'}
              height={'8px'}
              borderRadius={'50%'}
              margin={'2px 0 0 0'}
            />
          );
        } else if (crowded > 3) {
          return (
            <CellDots>
              <CellDot
                color={color}
                width={'4px'}
                height={'4px'}
                borderRadius={'0 4px 0 0'}
                margin={'2px 0 0 4px'}
              />
              <CellDot
                color={color}
                width={'8px'}
                height={'4px'}
                borderRadius={'0 0 4px 4px'}
                margin={'0 0 0 0'}
              />
            </CellDots>
          );
        } else if (crowded > 2) {
          return (
            <CellDot
              color={color}
              width={'4px'}
              height={'8px'}
              borderRadius={'0 4px 4px 0'}
              margin={'2px 0 0 4px'}
            />
          );
        } else {
          return (
            <CellDot
              color={color}
              width={'4px'}
              height={'4px'}
              borderRadius={'0 4px 0 0'}
              margin={'2px 0 4px 4px'}
            />
          );
        }
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
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
`;

const CellDots = styled.div`
  display: flex;
  flex-direction: column;
  align-content:;
`;
