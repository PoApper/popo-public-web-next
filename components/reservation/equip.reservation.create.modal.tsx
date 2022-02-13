import { KeyboardEvent, useEffect, useState } from 'react'
import { Button, Divider, Form, Modal } from 'semantic-ui-react'
import axios from 'axios'
import { DateInput } from 'semantic-ui-calendar-react'
import moment from 'moment'

type UserInfo = {
  name: string
}

type EquipmentType = {
  uuid: string,
  name: string,
  description: string,
  fee: number,
  imageName: string
};

type EquipReservationCreateModalProps = {
  associationName: string,
}

const EquipReservationCreateModal
  = ({ associationName }: EquipReservationCreateModalProps) => {
  const [open, setOpen] = useState(false)

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
  })
  const [equipments, setEquipments] = useState<EquipmentType[]>([])

  const [phone, setPhone] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState(moment())

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true }).
      then(res => setUserInfo(res.data)).
      catch(() => {})

    axios.get(`${process.env.NEXT_PUBLIC_API}/equip/owner/${associationName}`).
      then((res) => setEquipments(res.data))

  }, [associationName])

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button primary>예약 신청하기</Button>}
    >
      <Modal.Header>예약 승인/거절</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required readOnly label={'사용자'}
            value={userInfo.name}/>

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
                  const targetDate = value.value
                  const isToday = targetDate == moment().format('YYYY-MM-DD')
                  setDate(moment(targetDate))
                  if (isToday) {
                    // startTime
                    // endTime
                  } else {
                    // startTime
                    // endTime
                  }
                }}/>
            </div>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EquipReservationCreateModal