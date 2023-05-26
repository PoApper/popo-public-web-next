import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import { Button, Grid } from 'semantic-ui-react'

import Layout from '@/components/layout'
import ReservationCalendar
  from '@/components/reservation/reservation.calendar'
import EquipReservationTable
  from '@/components/reservation/equip.reservation.table'
import EquipListTable from '@/components/reservation/equip.list.table'
import EquipReservationCreateModal
  from '@/components/reservation/equip.reservation.create.modal'
import Link from 'next/link'

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
  const startDate = moment().subtract(1, 'months').startOf('month').format('YYYYMMDD')

  const associationKorName = ownerName[associationName];
  const associationLocation = ownerLocation[associationName];

  useEffect(() => {
    if (!associationName) return
    // TODO: not retrieve all reservations on that place,
    // TODO: just search for a month, and when month change search again!
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${associationName}&startDate=${startDate}`,
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
  }, [startDate, associationName, selectedDate])

  return (
    <Layout>
      <h1>{associationKorName} - 장비 예약하기</h1>
      <Grid columns={2} divided stackable>

        <Grid.Column width={6}>
          <EquipListTable associationName={associationName}/>
          {
            associationName == "dongyeon"
              ? <p>
                  1. 물품 대여는 예약 신청 - 입금 - 입금 확인 후 가능합니다. <br/>
                  2. 예약금은 최소한 대여일 전날 입금 바랍니다. <br/>
                  3. 예약비는 {dongyeonBank} 계좌로 입금 바랍니다. <br/>
                  4. 입금자명은 예약자명과 같게 해주세요. <br/>
                  5. 장비 분실 및 예약 시간을 어길시 책임을 물을 수 있습니다. <br/>
                  6. 대여시간은 학기중 평일 12:30 ~ 13:30 입니다. 그 외 시간의 대여와 반납은 어렵습니다. <br/>
                  7. 예약한 장비는 동아리 연합회 사무실(학생회관 301호)에서 수령할 수 있습니다. <br/>
                  8. 기타 문의는 (운영관리부) 010-5314-6211 연락주세요. <br/>
                </p>
                : <p style={{ marginTop: '10px' }}>
                  장비를 클릭하면 장비 사진을 볼 수 있습니다! 🖼️<br/>
                  예약한 장비는 {associationLocation}에서 수령하실 수 있습니다. 🏢️<br/>
                  장비가 분실되거나 예약 시간을 초과할 경우, 차후 예약에 제한을 둘 수 있습니다. 🚨<br/>
                </p>
          }

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <EquipReservationCreateModal associationName={associationName}/>
            <Link href={'/auth/my-reservation'} passHref>
              <Button>내 예약 목록</Button>
            </Link>
          </div>
        </Grid.Column>

        <Grid.Column>
          <Grid rows={2} divided stackable style={{ padding: '1rem' }}>
            <Grid.Column>
              <Grid.Row centered style={{ margin: '0 0 1rem' }}>
                <ReservationCalendar
                  markedDates={markedDates}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}/>
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