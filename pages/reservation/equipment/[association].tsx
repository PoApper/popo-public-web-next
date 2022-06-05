import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Grid } from 'semantic-ui-react'

import Layout from '../../../components/layout'
import ReservationCalendar
  from '../../../components/reservation/reservation.calendar'
import EquipReservationTable
  from '../../../components/reservation/equip.reservation.table'
import EquipListTable from '../../../components/reservation/equip.list.table'
import EquipReservationCreateModal
  from '../../../components/reservation/equip.reservation.create.modal'

type ObjectType = {
  [key: string]: string
}

const ownerName: ObjectType = {
  'dongyeon': '동아리연합회',
  'dormunion': '생활관자치회',
  'saengna': '생각나눔',
}

const ownerLocation: ObjectType = {
  'dongyeon': '동아리연합회 사무실(학생회관 301호)',
  'dormunion': '생활관자치회 사무실(생활관 4동)',
  'saengna': '생각나눔 사무실(학생회관 108호)',
}


const EquipAssociationPage: React.FunctionComponent = () => {
  const router = useRouter()
  const associationName = router.query.association as string

  const [selectedDate, setSelectedDate] = useState(moment().format('YYYYMMDD'))
  const [markedDates, setMarkedDates] = useState<Date[]>([])
  const [dongyeonBank, setDongyeonBank] = useState('')

  const associationKorName = ownerName[associationName];
  const associationLocation = ownerLocation[associationName];

  useEffect(() => {
    if (!associationName) return
    // TODO: not retrieve all reservations on that place,
    // TODO: just search for a month, and when month change search again!
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${associationName}`,
    ).then(res => {
      const allReservations = res.data
      const datesArr = []
      for (const reservation of allReservations) {
        const date = reservation.date; // YYYYMMDD
        datesArr.push(moment(date).toDate());
      }
      setMarkedDates(datesArr)
    })

    axios.get(`${process.env.NEXT_PUBLIC_API}/setting`)
         .then(res => setDongyeonBank(res.data.dongyeon_bank))
  }, [associationName, selectedDate])

  function handleDateChange(e: React.SyntheticEvent<HTMLElement>, data: any): void {
    e.preventDefault();
    const date: string = data.value; // YYYYMMDD
    setSelectedDate(date);
  }

  return (
    <Layout>
      <h1>{associationKorName} - 장비 예약하기</h1>
      <Grid columns={2} divided stackable>

        <Grid.Column width={6}>
          <EquipListTable associationName={associationName}/>
          <p style={{ marginTop: '10px' }}>
            장비를 클릭하면 장비 사진을 볼 수 있습니다! 🖼️<br/>
            예약한 장비는 {associationLocation}에서 수령하실 수 있습니다. 🏢️<br/>
            장비가 분실되거나 예약 시간을 초과할 경우, 차후 예약에 제한을 둘 수 있습니다. 🚨<br/>
          </p>
          {
            associationName == "dongyeon"
              ? <p>
                  예약비는 {dongyeonBank} 계좌로 입금 바랍니다. 💰
                </p>
                : null
          }
          <EquipReservationCreateModal
            associationName={associationName}/>
        </Grid.Column>

        <Grid.Column>
          <Grid rows={2} divided stackable>
            <Grid.Column>
              <Grid.Row centered style={{ marginBottom: '1em' }}>
                <ReservationCalendar
                  selectedDate={selectedDate}
                  markedDates={markedDates}
                  handleDateChange={handleDateChange}/>
              </Grid.Row>
              <Grid.Row>
                <EquipReservationTable
                  associationName={associationName}
                  selectedDate={selectedDate}/>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>

      </Grid>
    </Layout>
  )
}

export default EquipAssociationPage