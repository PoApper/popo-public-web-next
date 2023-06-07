import { Button, Container, Form, List } from 'semantic-ui-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import { PoPoAxios } from '@/lib/axios.instance'

const LoginPage = () => {
  const router = useRouter();

  const [id, setId] = useState<string>('')
  const [password, setPW] = useState<string>('')

  useEffect(() => {
    PoPoAxios.get('/auth/verifyToken', {withCredentials: true})
      .then(() => {
        alert('이미 로그인 되었습니다.');
        router.push('/');
      }).catch(() => {})
  }, [router])

  async function handleLogin () {
    try {
      await PoPoAxios.post('/auth/login', {
        id: id,
        password: password,
      }, { withCredentials: true })
      router.push('/');
    } catch (err: any) {
      const response = err.response
      alert(`⚠ 등록되지 않은 ID/PW 입니다. ⚠\n"${response.data.message}"`)
    }
  }

  return (
    <Layout>
      <Container style={{
        width: 640,
        padding: 24,
        margin: '2em 0 0',
        backgroundColor: '#eeeeee',
        borderRadius: 8,
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
        <p>
          로그인/회원가입에 문제를 겪고 있다면, 하단의 POPO 관리자 메일로 연락 바랍니다.
        </p>
      </Container>
    </Layout>
  )
}

export default LoginPage
