import { Button, Icon, Label, Table } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'

import { convertDate, convertStatus, convertTime } from '@/lib/time-date'
import { IPlaceReservation } from '@/types/reservation.interface'
import PlaceReservationDetailModal
  from '../reservation/place.reservation.detail.modal'
import DeleteConfirmModal from '../common/delete.confirm.modal'
import { PoPoAxios } from '@/lib/axios.instance'
import Link from 'next/link'

const MyPlaceReservationTable = () => {
  const [reserve_list, setReserveList] = useState<IPlaceReservation[]>([])

  useEffect(() => {
    PoPoAxios.get(
      '/reservation-place/user',
      { withCredentials: true }).
      then((res) => setReserveList(res.data)).
      catch(err => {
        alert('내 장소 예약 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <Table compact>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 제목</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 설명</Table.HeaderCell>
          <Table.HeaderCell width={4}>예약 장소</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 기간</Table.HeaderCell>
          <Table.HeaderCell width={1}>상태</Table.HeaderCell>
          <Table.HeaderCell width={1}/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          reserve_list.map((reservation, idx) => {
            return (
              <Table.Row textAlign="center" key={reservation.uuid}>
                <Table.Cell>{idx + 1}</Table.Cell>

                <PlaceReservationDetailModal
                  key={reservation.uuid}
                  reservation={reservation}
                  trigger={
                    <Table.Cell style={{cursor: 'pointer'}}>
                      {reservation.title}
                    </Table.Cell>
                  }
                />

                <Table.Cell style={{cursor: 'pointer'}}>
                  {reservation.description}
                </Table.Cell>

                <Table.Cell>
                  <Link href={`/reservation/place/${reservation.place.region}/${reservation.place.name}`}>
                    {reservation.place.name}
                  </Link>
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

                <Table.Cell>
                  <DeleteConfirmModal
                    target={reservation.title}
                    deleteURI={`reservation-place/${reservation.uuid}`}
                    trigger={
                      <Button negative size={'tiny'}>
                        <Icon name={'trash'}/>
                      </Button>
                    }
                  />
                </Table.Cell>

              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default MyPlaceReservationTable