import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'

import Layout from '../../../../components/layout'
import PlaceReservationTable
  from '../../../../components/reservation/place.reservation.table'
import ReservationCalendar
  from '../../../../components/reservation/reservation.calendar'
import PlaceInfoCard from '../../../../components/reservation/placeInfoCard'

type bookerType = {
  name: string,
  userType: string
}

type reservationType = {
  booker: bookerType,
  date: string,
  description: string,
  start_time: string,
  end_time: string,
  phone: string,
  status: string,
  title: string
}

const handleDateChange = (e, data) => {
  try {

  } catch (error) {
    alert('조회 실패...')
  }
}

const RegionPlace: React.FunctionComponent = () => {
  const router = useRouter()
  const placeName = router.query.placeName as string
  const [selectedDate, setDate] = useState(
    moment(new Date()).format('YYYYMMDD'))
  const [reservations, setReservations] = useState<reservationType[]>([])
  const currentDate: Date = new Date()
  const currentDateTime: number = currentDate.getFullYear() * 10000 +
    (currentDate.getMonth() + 1) * 100 + currentDate.getDate()

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-place/placeName/${placeName}/${currentDateTime}`,
    ).then(res => setReservations(res.data))
  }, [placeName, selectedDate])

  return (
    <Layout>
      <div>
        <Grid columns={2} divided stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <PlaceInfoCard placeName={placeName}/>
            </Grid.Column>
            <Grid.Column>
              <Grid rows={2} divided stackable>
                <Grid.Column>
                  <Grid.Row centered style={{ marginBottom: '1em' }}>
                    <ReservationCalendar selectedDate={selectedDate}/>
                  </Grid.Row>
                  <Grid.Row>
                    <PlaceReservationTable reservations={reservations}/>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  )
}

export default RegionPlace