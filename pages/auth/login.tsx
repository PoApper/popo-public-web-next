import {Button, Container, Form, List, Message} from 'semantic-ui-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import { PoPoAxios } from '@/lib/axios.instance'

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('')
  const [password, setPW] = useState<string>('')

  useEffect(() => {
    PoPoAxios.get('/auth/verifyToken', {withCredentials: true})
      .then(() => {
        alert('이미 로그인 되었습니다.');
        router.push('/');
      }).catch(() => {})
  }, [router])

  async function handleLogin () {
    const body = {
      email: email,
      password: password,
    };

    PoPoAxios.post('/auth/login', body, { withCredentials: true })
      .then(() => {
        router.push('/');
      }).catch((err) => {
        const response = err.response;
        alert(`⚠ 등록되지 않은 Email/PW 입니다. ⚠\n"${response.data.message}"`);
      });
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
            label={'Email'}
            onChange={e => setEmail(e.target.value)}/>
          <Form.Input
            label={'비밀번호'} type={'password'}
            onChange={e => setPW(e.target.value)}/>
          <Button primary onClick={handleLogin}>로그인</Button>
        </Form>
        <Message>
          `2023.08.13`부터 POPO 로그인 방식이 ID/PW에서 Email/PW로 변경 됩니다.
        </Message>
        <List horizontal divided link size="small">
          {/*<List.Item as="a" disabled content={'비밀번호 찾기'}/>*/}
          <Link href={'/auth/register'} passHref>
            <List.Item as="a" content={'회원가입'}/>
          </Link>
        </List>
        <p>
          현재 AWS Cognito로 회원 관리를 이전하고 있습니다. 아이디 및 비밀번호 찾기에 문제를 겪고 있다면 하단의 POPO 관리자 메일로 연락 부탁드립니다.  
        </p>
      </Container>
    </Layout>
  )
}

export default LoginPage
