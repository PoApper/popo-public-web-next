import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Form, Message, Modal } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'

import { hourDiff, roundUpByDuration } from '../../lib/time-date'
import { IEquipment } from '../../types/reservation.interface'
import { IUser } from '../../types/user.interface'
import ReservationDatetimePicker from './reservation.datetime.picker'

type EquipReservationCreateModalProps = {
  associationName: string,
}

const EquipReservationCreateModal
  = ({ associationName }: EquipReservationCreateModalProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [userInfo, setUserInfo] = useState<IUser | null>({
    name: '',
  })
  const [equipments, setEquipments] = useState<IEquipment[]>([])

  const [reservedEquips, setReservedEquips] = useState<string[]>([])
  const [phone, setPhone] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [feeSum, setFeeSum] = useState(0)

  const now: moment.Moment = roundUpByDuration(moment(), 30);
  const nowNext30Min: moment.Moment = moment(now).add(30, 'minute');

  const [date, setDate] = useState<moment.Moment>(now) // YYYY-MM-DD
  const [startTime, setStartTime] = useState<moment.Moment>(now) // HHmm
  const [endTime, setEndTime] = useState<moment.Moment>(nowNext30Min) // HHmm

  useEffect(() => {
    if (!associationName) return;

    axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true }).
      then(res => setUserInfo(res.data)).
      catch(() => setUserInfo(null))

    axios.get(`${process.env.NEXT_PUBLIC_API}/equip/owner/${associationName}`).
      then((res) => setEquipments(res.data))

  }, [associationName, router])

  function handleSubmit () {
    axios.post(`${process.env.NEXT_PUBLIC_API}/reservation-equip`, {
      equipments: reservedEquips,
      owner: associationName,
      phone: phone,
      title: title,
      description: description,
      date: date.format('YYYYMMDD'), // YYYYMMDD
      start_time: startTime.format('HHmm'), // HHmm
      end_time: endTime.format('HHmm'), // HHmm
    }, { withCredentials: true })
      .then(() => {
        alert('예약을 생성했습니다!');
        window.location.reload();
      })
      .catch((error) => {
        alert(`예약 생성에 실패했습니다: ${error.response.data.message}`)
    })
  }

  return (
    <Modal
      closeIcon
      size={"small"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        if (userInfo || process.env.NODE_ENV === "development") {
          setOpen(true)
        } else {
          alert('로그인 후 예약할 수 있습니다.')
          router.push('/auth/login')
        }
      }}
      trigger={<Button primary>예약 신청하기</Button>}
    >
      <Modal.Header>장비 예약 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required readOnly label={'사용자'}
            value={userInfo ? userInfo.name : ''}/>

          <Form.Input
            required label={'전화번호'}
            placeholder={'010-xxxx-xxxx'}
            onChange={e => setPhone(e.target.value)}/>
          <Form.Input
            required label={'예약 제목'}
            placeholder={'예약 제목을 작성해주세요.'}
            onChange={e => setTitle(e.target.value)}/>
          <Form.TextArea
            required label={'설명'}
            placeholder={'사용처를 반드시 작성 해주세요.'}
            onChange={e => setDescription(e.target.value)}/>

          <Divider/>

          <Form.Dropdown
            required fluid multiple search selection
            label={'장비 선택'}
            placeholder={'예약할 장비들을 선택해주세요.'}
            options={equipments.map((equip, idx) => ({
              key: idx,
              text: equip.name,
              value: equip.uuid,
            }))}
            onKeyDown={(e: KeyboardEvent) => e.preventDefault()}
            onChange={(e, {value}) => {
              let feeSum = 0;

              // @ts-ignore
              for (const uuid of value) {
                for (const equip of equipments) {
                  if (equip.uuid === uuid) {
                    feeSum += equip.fee
                  }
                }
              }
              setFeeSum(feeSum)

              // @ts-ignore
              setReservedEquips(value)
            }}
          />

          <Form.Group>
            <ReservationDatetimePicker
              date={date} startTime={startTime} endTime={endTime}
              setDate={setDate} setStartTime={setStartTime} setEndTime={setEndTime}
            />
          </Form.Group>

          <Message>
            <Message.Header>예약한 장비의 예약비를 꼭 확인해주세요!</Message.Header>
            <p>
              {reservedEquips.length}개 장비, {hourDiff(startTime, endTime)}시간 예약, 총 예약비는 {Number(feeSum).toLocaleString()}원 입니다.
            </p>
          </Message>

          <Form.Button onClick={handleSubmit}>
            생성
          </Form.Button>

        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EquipReservationCreateModal