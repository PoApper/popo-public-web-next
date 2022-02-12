import React, { useEffect, useState } from 'react'
import { Label, Table } from 'semantic-ui-react'
import axios from 'axios'

import { convertDate, convertStatus, convertTime } from '../../lib/time-date'

type EquipReservationTableProps = {
  associationName: string,
  selectedDate: string,
}

type BookerType = {
  name: string,
  userType: string,
}

type EquipmentType = {
  uuid: string,
  name: string,
}

type EquipReservationType = {
  uuid: string,
  booker: BookerType,
  equipments: EquipmentType[],
  date: string,
  description: string,
  start_time: string,
  end_time: string,
  phone: string,
  status: string,
  title: string,
}

const EquipReservationTable = ({
  associationName,
  selectedDate,
}: EquipReservationTableProps) => {
  const [reservations, setReservations] = useState<EquipReservationType[]>([])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip?owner=${associationName}&date=${selectedDate}`,
    ).then(res => setReservations(res.data))
  }, [associationName, selectedDate])

  return (
    <>
      <Table compact>
        <Table.Header>
          <Table.Row textAlign={'center'}>
            <Table.HeaderCell>사용자</Table.HeaderCell>
            <Table.HeaderCell>장비명</Table.HeaderCell>
            <Table.HeaderCell>예약 기간</Table.HeaderCell>
            <Table.HeaderCell>상태</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            reservations.length ?
              reservations.map(reservation => {
                return (
                  <Table.Row key={reservation.uuid} textAlign="center">
                    <Table.Cell>{reservation.booker.name}</Table.Cell>
                    <Table.Cell>
                      {
                        reservation.equipments ?
                          reservation.equipments.map(equip => {
                            return <Label key={equip.uuid}>{equip.name}</Label>
                          }) : null
                      }
                    </Table.Cell>
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
                  <Table.Cell textAlign={'center'}>등록된 예약이 없습니다!</Table.Cell>
                  <Table.Cell/>
                  <Table.Cell/>
                </Table.Row>
              )
          }
        </Table.Body>
      </Table>
    </>
  )
}

export default EquipReservationTable
