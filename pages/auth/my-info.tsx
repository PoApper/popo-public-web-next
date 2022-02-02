import { Container, Form, Segment } from 'semantic-ui-react'
import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'

interface MyInformation {
  email: string;
  id: string;
  name: string;
  userType: string;
  createdAt: Date;
}

const MyInfoPage = () => {
  const router = useRouter()

  const [myInfo, setMyInfo] = useState<MyInformation>(
    { email: '', id: '', name: '', userType: '', createdAt: new Date() })
  const [password, setPW] = useState<string>('')
  const [passwordAgain, setPwAgain] = useState<string>('')

  const isValidPassword: boolean
    = (password.length > 0 && !RegExp(/^(\w{8,16})$/).test(password))
  const isValidPasswordAgain: boolean
    = (passwordAgain.length > 0) && (password !== passwordAgain)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/auth/myInfo`,
      { withCredentials: true }).
      then((res) => setMyInfo(res.data)).
      catch(() => {}) // TODO: add alert and redirect to login
  }, [router])

  async function submitNewPassword () {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/auth/updatePW`, {
        'password': password,
      }, { withCredentials: true })
      alert('비밀번호 변경에 성공했습니다!')
      window.location.reload()
    } catch (err: any) {
      const response = err.response
      alert(`비밀번호 업데이트에 실패했습니다. 😢\n"${response.data.message}"`)
    }
  }

  return (
    <Layout>
      <Container style={{
        padding: '40px',
        margin: '2em 0 4em',
        backgroundColor: '#eeeeee',
        borderRadius: '8px',
      }}>
        <h2>내 정보</h2>
        <Segment.Group>
          <Segment>
            <h4>email</h4>
            <Container>
              {myInfo.email}
            </Container>
          </Segment>

          <Segment>
            <h4>ID</h4>
            <Container>
              {myInfo.id}
            </Container>
          </Segment>

          <Segment>
            <h4>비밀번호 수정하기</h4>
            <Form>
              <Form.Group style={{ marginBottom: '8px' }}>
                <Form.Input
                  required type="password" width={8}
                  label="Password"
                  placeholder="8자리 이상 16자리 이하"
                  onChange={e => setPW(e.target.value)}
                  error={isValidPassword ? '비밃번호가 너무 짧습니다.' : null}/>

                <Form.Input
                  required type="password" width={8}
                  label="Password 확인"
                  onChange={e => setPwAgain(e.target.value)}
                  error={isValidPasswordAgain ? '비밀번호가 일치하지 않습니다.' : null}/>

              </Form.Group>
              <Form.Button primary size="mini" onClick={submitNewPassword}>
                비밀번호 수정
              </Form.Button>
            </Form>
          </Segment>

          <Segment>
            <h4>이름</h4>
            <Container>
              {myInfo.name}
            </Container>
          </Segment>

          <Segment>
            <h4>유저 타입</h4>
            <Container>
              {myInfo.userType}
            </Container>
          </Segment>

          <Segment>
            <h4>가입일</h4>
            <Container>
              {moment(myInfo.createdAt).format('YYYY.MM.DD HH:mm')}
            </Container>
          </Segment>

        </Segment.Group>
      </Container>
    </Layout>
  )
}

export default MyInfoPage