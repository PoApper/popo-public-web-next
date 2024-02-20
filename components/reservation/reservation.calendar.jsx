import React, { useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import styled from 'styled-components'

import { PoPoAxios } from '@/lib/axios.instance'
import { IPlaceReservation } from '@/types/reservation.interface'

const ReservationCalendar = ({
  markedDates,
  selectedDate,
  setSelectedDate,
  placeName,
}) => {
  const [reservations, setReservations] = useState<IPlaceReservation[]>([])

  const handleTileContent = ({ date, _ }) => {
    let color = null;
    let height = null; 
    let border_radius = null;

    if (markedDates.find((x) => moment(x).format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))) {
      color = "#f2711c";
    }

    if (placeName == "equip") {
      height = "8px";
      border_radius = "50%";
      return <CellDot color={color} height={height} border_radius={border_radius} />;
    }

    PoPoAxios.get(
      `/reservation-place/placeName/${placeName}/${date}`,
      ).then(res => setReservations(res.data))

    let crowded = null;
    crowded = reservations.length;
    console.log(crowded);
    
    if (crowded < 10 ) { 
      height = "4px";
      border_radius = "4px 0 0 4px";
    }
    else {
      height = "8px";
      border_radius = "50%";
    }
    return <CellDot color={color} height={height} border_radius={border_radius} />;
  }

  return (
    <StyledCalendar
      formatDay={(_, date) => moment(date).format('DD')}
      onChange={(value, _) => setSelectedDate(moment(value).format('YYYYMMDD'))}
      defaultValue={moment(selectedDate).toDate()}
      view={"month"}
      prev2Label={null}
      next2Label={null}
      tileContent={handleTileContent}
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
  height: ${props => props.height};
  width: 8px;
  background-color: ${props => props.color};
  border-radius: ${props => props.border_radius};
  display: flex;
  margin: 2px auto;
`