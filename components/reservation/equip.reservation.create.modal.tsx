import { KeyboardEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Form, Message, Modal } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'

import { DateInput } from 'semantic-ui-calendar-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { hourDiff, roundUpByDuration } from '../../lib/time-date'
import { IEquipment } from '../../types/reservation.interface'
import { IUser } from '../../types/user.interface'

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
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD')) // YYYY-MM-DD
  const [startTime, setStartTime]
    = useState<string>(roundUpByDuration(moment(), 30).format('HHmm')) // HHmm
  const [endTime, setEndTime]
    = useState<string>(
    roundUpByDuration(moment(), 30).add(30, 'minute').format('HHmm')) // HHmm
  const [feeSum, setFeeSum] = useState(0)

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
      date: moment(date).format('YYYYMMDD'), // YYYYMMDD
      start_time: startTime, // HHmm
      end_time: endTime, // HHmm
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
        if (userInfo) {
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
            <div className={'required field'}>
              <label>날짜</label>
              <DateInput
                dateFormat={'yyyy-MM-DD'}
                minDate={moment()} maxDate={moment().add(30, 'day')}
                // @ts-ignore
                value={date}
                onKeyDown={(e: KeyboardEvent) => e.preventDefault()}
                onChange={(_, value) => {
                  const targetDate: string = value.value // YYYY-MM-DD
                  const todayDate: string = moment().format('YYYY-MM-DD')
                  setDate(targetDate)
                  if (targetDate === todayDate) {
                    setStartTime(roundUpByDuration(moment(), 30).format('HHmm'))
                    setEndTime(
                      roundUpByDuration(moment(), 30).
                        add(30, 'minute').
                        format('HHmm'))
                  } else {
                    setStartTime('0000')
                    setEndTime('0030')
                  }
                }}/>
            </div>

            <div className={'required field'}>
              <label>시작 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                dateFormat={'hh:mm aa'}
                selected={moment(startTime, 'HHmm').toDate()}
                minTime={
                  (moment().format('YYYY-MM-DD') === date) ?
                    moment().toDate() :
                    moment().startOf('day').toDate()
                }
                maxTime={moment().endOf('day').toDate()}
                onKeyDown={e => e.preventDefault()}
                onChange={(startTime: Date) => {
                  setStartTime(moment(startTime).format('HHmm'))
                  setEndTime(moment(startTime).add(30, 'minute').format('HHmm'))
                }}/>
            </div>

            <div className={'required field'}>
              <label>종료 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                dateFormat={'hh:mm aa'}
                selected={moment(endTime, 'HHmm').toDate()}
                minTime={moment(startTime).add(30, 'minute').toDate()}
                maxTime={moment().endOf('day').toDate()}
                onKeyDown={e => e.preventDefault()}
                onChange={(endTime: Date) => {
                  setEndTime(moment(endTime).format('HHmm'))
                }}/>
            </div>
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