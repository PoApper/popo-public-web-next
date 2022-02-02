import { Label, Table } from 'semantic-ui-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { convertDate, convertStatus, convertTime } from '../../lib/time-date'
import styled from 'styled-components'

const MyEquipReservationTable = () => {
  const [reserve_list, setReserveList] = useState([])

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/reservation-equip/user`,
      { withCredentials: true }).
      then((res) => setReserveList(res.data)).
      catch(err => {
        alert('내 장비 예약 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  })

  return (
    <Table compact>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell width={1}>idx.</Table.HeaderCell>
          <Table.HeaderCell>예약 제목</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 기간</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 장비</Table.HeaderCell>
          <Table.HeaderCell width={1}>상태</Table.HeaderCell>
          <Table.HeaderCell width={3}>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          reserve_list.map((reservation, idx) => {
            return (
              <Table.Row textAlign="center" key={reservation.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{reservation.title}</Table.Cell>
                <Table.Cell>
                  {
                    reservation.equipments.map(equipment => {
                      return (
                        <EquipmentName key={equipment.uuid}>
                          {equipment.name}
                        </EquipmentName>
                      )
                    })
                  }
                </Table.Cell>
                <Table.Cell>
                  {convertDate(reservation.date)}<br/>
                  {convertTime(reservation.start_time)} ~
                  {convertTime(reservation.end_time)}
                </Table.Cell>
                <Table.Cell>
                  <Label circular empty
                         color={convertStatus(reservation.status)}/>
                </Table.Cell>
                <Table.Cell>{moment(new Date(reservation.created_at)).
                  format('YYYY.MM.DD')}</Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default MyEquipReservationTable

const EquipmentName = styled.span`
  background-color: lightgrey;
  padding: 1px;
  margin: 1px;
`