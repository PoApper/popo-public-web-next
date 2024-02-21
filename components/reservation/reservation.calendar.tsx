import React, { useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import styled from 'styled-components'

import { PoPoAxios } from '@/lib/axios.instance'
import { IPlaceReservation } from '@/types/reservation.interface'

type ReservationCalendarProps = {
  markedDates: Date[],
  selectedDate: string,
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
  placeName: string,
}

const ReservationCalendar = ({
  markedDates,
  selectedDate,
  setSelectedDate,
  placeName,
}: ReservationCalendarProps) => {
  const [reservations, setReservations] = useState<IPlaceReservation[]>([])

  const handleTileContent = ({ date, _ }:{date:string, _:any}) => {
    let color = "#ffffff";
    let height = null; let width=null;
    let border_radius = null;

    if (markedDates.find((x:any) => moment(x).format('YYYY-MM-DD') === moment(date).format("YYYY-MM-DD"))) {
      color = "#f2711c";
    }

    if (placeName == "equip") {
      height = "8px";
      width = "8px";
      border_radius = "50%";
      return <CellDot color={color} height={height} width={width} border_radius={border_radius} />;
    }
    
    try {
      PoPoAxios.get(
      `/reservation-place/placeName/${placeName}/${date}`,
      ).then(res => setReservations(res.data))
    } catch (e) {
      alert('Failed to load reservations')
      console.log(e)
    }
    

    let crowded = null;
    crowded = reservations.length;
    
    if (crowded < 3 ) { 
      height = "8px";
      width = "4px";
      border_radius = "4px 0 0 4px";
    }
    else {
      height = "8px";
      width = "8px";
      border_radius = "50%";
    }
    return <CellDot color={color} height={height} width={width} border_radius={border_radius} />;
  }

  return (
    <StyledCalendar
      formatDay={(_, date) => moment(date).format('DD')}
      onChange={(value:any, _) => setSelectedDate(moment(value).format('YYYYMMDD'))}
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

const CellDot = styled.div<{color:string; height:string; width:string; border_radius:string}>`
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.color};
  border-radius: ${props => props.border_radius};
  display: flex;
  margin: 2px auto;
`