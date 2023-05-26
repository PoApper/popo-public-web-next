import { Icon, Label, Table, Button } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { convertDate, convertStatus, convertTime } from '@/lib/time-date'
import { IEquipReservation } from '@/types/reservation.interface'
import EquipReservationDetailModal
  from '../reservation/equip.reservation.detail.modal'
import DeleteConfirmModal from '../common/delete.confirm.modal'

const MyEquipReservationTable = () => {
  const [reserve_list, setReserveList] = useState<IEquipReservation[]>([])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/reservation-equip/user`,
      { withCredentials: true }).
      then((res) => setReserveList(res.data)).
      catch(err => {
        alert('내 장비 예약 목록을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <Table compact>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={5}>예약 제목</Table.HeaderCell>
          <Table.HeaderCell width={4}>예약 장비</Table.HeaderCell>
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

                <EquipReservationDetailModal
                  key={reservation.uuid}
                  reservation={reservation}
                  trigger={
                    <Table.Cell style={{cursor: 'pointer'}}>
                      {reservation.title}
                    </Table.Cell>                  }
                />

                <Table.Cell>
                  {
                    reservation.equipments.map(equipment => {
                      return (
                        <Label key={equipment.uuid}>
                          {equipment.name}
                        </Label>
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

                <Table.Cell>
                  <DeleteConfirmModal
                    target={reservation.title}
                    deleteURI={`reservation-equip/${reservation.uuid}`}
                    trigger={
                      <Button negative>
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

export default MyEquipReservationTable
