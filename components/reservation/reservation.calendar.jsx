import moment from 'moment'
import React from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

const ReservationCalendar = ({
  markedDates,
  selectedDate,
  setSelectedDate,
}) => {
  console.log("selectedDate", selectedDate);
  console.log("value", moment(selectedDate).toDate());

  return (
    <StyledCalendar
      formatDay={(_, date) => moment(date).format('DD')}
      onChange={(value, _) => setSelectedDate(moment(value).format('YYYYMMDD'))}
      defaultValue={moment(selectedDate).toDate()}
      view={"month"}
      prev2Label={null}
      next2Label={null}
      tileContent={({ date, _ }) => {
        let color = null;
        if (markedDates.find((x) => moment(x).format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))) {
          color = "#f2711c";
        }
        return <CellDot color={color} />;
      }}
    />
  )
}

export default ReservationCalendar

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: 1px solid rgba(34, 36, 38, 0.15);
  font-size: 1.2rem;
`

const CellDot = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: flex;
  margin: 2px auto;
`

