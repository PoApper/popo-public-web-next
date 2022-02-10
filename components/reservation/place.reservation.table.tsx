import { Label, Table } from 'semantic-ui-react'
import React from 'react'
import { convertDate, convertStatus, convertTime } from '../../lib/time-date'

type bookerType = {
  name: string,
  userType: string
}

type reservationType = {
  uuid: string,
  booker: bookerType,
  date: string,
  description: string,
  start_time: string,
  end_time: string,
  phone: string,
  status: string,
  title: string
}

type PlaceReservationTable = {
  reservations: reservationType[]
}

const PlaceReservationTable = ({ reservations }: PlaceReservationTable) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>사용자</Table.HeaderCell>
          <Table.HeaderCell>예약 제목</Table.HeaderCell>
          <Table.HeaderCell>예약 기간</Table.HeaderCell>
          <Table.HeaderCell>상태</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          reservations.length ?
            reservations.map((reservation) => {
              return (
                <Table.Row key={reservation.uuid} textAlign="center">
                  <Table.Cell>{reservation.booker.name}</Table.Cell>
                  <Table.Cell>{reservation.title}</Table.Cell>
                  <Table.Cell>
                    {convertDate(reservation.date)}<br/>
                    {convertTime(reservation.start_time)} ~
                    {convertTime(reservation.end_time)}
                  </Table.Cell>
                  <Table.Cell>
                    <Label
                      circular empty
                      color={convertStatus(reservation.status)}/>
                  </Table.Cell>
                </Table.Row>
              )
            })
            : (
              <Table.Row>
                <Table.Cell/>
                <Table.Cell>등록된 예약이 없습니다!</Table.Cell>
                <Table.Cell/>
                <Table.Cell/>
              </Table.Row>
            )
        }
      </Table.Body>
    </Table>
  )
}

export default PlaceReservationTable
