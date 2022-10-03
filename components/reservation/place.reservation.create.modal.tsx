import { KeyboardEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Divider, Form, Message, Modal } from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'

import { DateInput } from 'semantic-ui-calendar-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { IUser } from '../../types/user.interface'
import { IPlace } from '../../types/reservation.interface'
import { hourDiff, roundUpByDuration } from '../../lib/time-date'

const RegionKorNameMapping = {
  STUDENT_HALL: '학생 회관',
  JIGOK_CENTER: '지곡 회관',
  OTHERS: '생활관 외',
  COMMUNITY_CENTER : '커뮤니티 센터',
}

type PlaceReservationCreateModalProps = {
  placeName: string,
}

const PlaceReservationCreateModal
  = ({ placeName }: PlaceReservationCreateModalProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [userInfo, setUserInfo] = useState<IUser | null>({
    name: '',
  })
  const [placeInfo, setPlaceInfo] = useState<IPlace>({
    uuid: '',
    name: '',
    region: '',
    description: '',
    location: '',
    imageName: ''
  })

  const [phone, setPhone] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const now: moment.Moment = roundUpByDuration(moment(), 30);
  const nowNext30Min: moment.Moment = moment(now).add(30, 'minute');

  const [date, setDate] = useState<moment.Moment>(now) // YYYY-MM-DD
  const [startTime, setStartTime] = useState<moment.Moment>(now) // HHmm
  const [endTime, setEndTime] = useState<moment.Moment>(nowNext30Min) // HHmm

  useEffect(() => {
    if (!placeName) return

    axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true }).
      then(res => setUserInfo(res.data)).
      catch(() => setUserInfo(null))

    axios.get(`${process.env.NEXT_PUBLIC_API}/place/name/${placeName}`).
      then((res) => setPlaceInfo(res.data))

  }, [placeName, router])

  function handleSubmit () {
    axios.post(`${process.env.NEXT_PUBLIC_API}/reservation-place`, {
      place_id: placeInfo.uuid,
      phone: phone,
      title: title,
      description: description,
      date: date.format('YYYYMMDD'), // YYYYMMDD
      start_time: startTime.format('HHmm'), // HHmm
      end_time: endTime.format('HHmm'), // HHmm
    }, { withCredentials: true }).then(() => {
      alert('예약을 생성했습니다!')
      window.location.reload()
    }).catch((error) => {
      alert(`예약 생성에 실패했습니다: ${error.response.data.message}`)
    })
  }

  return (
    <Modal
      closeIcon
      size={'small'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        if (userInfo) {
          setOpen(true)
        } else {
          setOpen(true)
          // alert('로그인 후 예약할 수 있습니다.')
          // router.push('/auth/login')
        }
      }}
      trigger={<Button primary>예약 신청하기</Button>}
    >
      <Modal.Header>장소 예약 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Input
              required readOnly label={'지역'} name="region"
              // @ts-ignore
              value={RegionKorNameMapping[placeInfo.region]}/>
            <Form.Input
              required readOnly label={'장소'} name="place"
              value={placeInfo.name}/>
          </Form.Group>

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
            placeholder={'사용 인원을 꼭 작성 해주세요.'}
            onChange={e => setDescription(e.target.value)}/>

          <Divider/>

          <Form.Group>
            <div className={'required field'}>
              <label>날짜</label>
              <DateInput
                dateFormat={'yyyy-MM-DD'}
                minDate={moment()} maxDate={moment().add(30, 'day')}
                value={date.format('YYYY-MM-DD')}
                onKeyDown={(e: KeyboardEvent) => e.preventDefault()}
                onChange={(_, value) => {
                  const targetDate: string = value.value // YYYY-MM-DD
                  if (targetDate === now.format('YYYY-MM-DD')) {
                    setDate(now);
                    setStartTime(now);
                    setEndTime(nowNext30Min);
                  } else {
                    setDate(moment(targetDate + 'T00:00'));
                    setStartTime(moment(targetDate + 'T00:00'));
                    setEndTime(moment(targetDate + 'T00:30'));
                  }
                }}/>
            </div>

            <div className={'required field'}>
              <label>시작 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                onKeyDown={e => e.preventDefault()}
                dateFormat={'hh:mm aa'}
                selected={startTime.toDate()}
                minTime={date.toDate()}
                maxTime={moment(date.format('YYYY-MM-DD') + 'T23:59').toDate()}
                onChange={(startTime: Date) => {
                  const newStartTime = moment(startTime);
                  const newStartTimeNext30Min = moment(newStartTime).add(30, 'minute');
                  setStartTime(newStartTime);
                  setEndTime(newStartTimeNext30Min);
                }}/>
            </div>

            <div className={'required field'}>
              <label>종료 시간</label>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeIntervals={30}
                onKeyDown={e => e.preventDefault()}
                dateFormat={'hh:mm aa'}
                selected={endTime.toDate()}
                minTime={
                  moment(startTime).add(30, 'minute').toDate()
                }
                maxTime={
                  (endTime.format('HHmm') === '0000') ?
                    moment(date.format('YYYY-MM-DD') + 'T00:00').toDate() // edge-case
                    : moment(date.format('YYYY-MM-DD') + 'T23:59').toDate()
                }
                onChange={(endTime: Date) => {setEndTime(moment(endTime))}}/>
            </div>
          </Form.Group>

          <Message>
            <Message.Header>예약 장소와 예약 시간을 꼭 확인해주세요!</Message.Header>
            <p>
              {
                // @ts-ignore
                RegionKorNameMapping[placeInfo.region]
              } {placeInfo.name}, {hourDiff(startTime, endTime)}시간 예약입니다.
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

export default PlaceReservationCreateModal