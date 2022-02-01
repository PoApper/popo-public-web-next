import { Button, Container, Form, List } from 'semantic-ui-react'
import Link from 'next/link'
import Layout from '../../components/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const router = useRouter();

  const [id, setId] = useState('')
  const [password, setPW] = useState('')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyToken`, {withCredentials: true})
      .then(() => {
        alert('이미 로그인 되었습니다.');
        router.push('/');
      }).catch(() => {})
  }, [router])

  async function handleLogin () {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        id: id,
        password: password,
      }, { withCredentials: true }) // `withCredentials`을 true로 설정해야 브라우저에서 JWT 쿠키를 생성할 수 있음.
      router.push('/');
    } catch (err: any) {
      const response = err.response
      alert(`⚠ 등록되지 않은 ID/PW 입니다. ⚠\n"${response.data.message}"`)
    }
  }

  return (
    <Layout>
      <Container id={'login'} style={{
        padding: '40px',
        margin: '2em 0 4em',
        backgroundColor: '#eeeeee',
        borderRadius: '8px'
      }}>
        <Form>
          <Form.Input
            label={'아이디'}
            onChange={e => setId(e.target.value)}/>
          <Form.Input
            label={'비밀번호'} type={'password'}
            onChange={e => setPW(e.target.value)}/>
          <Button primary onClick={handleLogin}>로그인</Button>
        </Form>
        <List horizontal divided link size="small">
          <List.Item as="a" disabled content={'아이디 찾기'}/>
          <List.Item as="a" disabled content={'비밀번호 찾기'}/>
          <Link href={'/auth/register'} passHref>
            <List.Item as="a" content={'회원가입'}/>
          </Link>
        </List>
      </Container>
    </Layout>
  )
}

export default LoginPage
