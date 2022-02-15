import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react'

type ReservationCalendarProps = {
  selectedDate: string,
  markedDates: Date[]
  handleDateChange: (e: React.SyntheticEvent<HTMLElement>, data: any) => void
}

const ReservationCalendar = ({
  selectedDate,
  markedDates,
  handleDateChange,
}: ReservationCalendarProps) => {
  return (
    <DateInput
      inline
      name={'date'}
      markColor={'orange'}
      value={selectedDate}
      marked={markedDates}
      dateFormat={'YYYYMMDD'}
      // @ts-ignore
      onChange={handleDateChange}
    />
  )
}

export default ReservationCalendar