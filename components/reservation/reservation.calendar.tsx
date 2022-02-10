import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DateInput } from 'semantic-ui-calendar-react'

type reservationType = {
  date: string
}

const ReservationCalendar = () => {
  const router = useRouter()
  const selectedDate = router.query.selectedDate as string
  const owner = router.query.owner
  const [reservations, setReservations] = useState<reservationType[]>([])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${owner}`).
      then((res) => {
        setReservations(res.data)
      })
  }, [selectedDate, owner])

  const markedDates: Date[] = []
  for (const reservation of reservations) {
    const date = reservation.date
  }

  return (
    <DateInput
      inline
      name={'date'}
      markColor={'orange'}
      value={selectedDate}
      marked={markedDates}
      dateFormat={'YYYYMMDD'}
      onChange={(e, data) => {
        e.preventDefault()
      }}
    />
  )
}

export default ReservationCalendar