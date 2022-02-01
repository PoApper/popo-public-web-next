import { useEffect, useState } from 'react'
import axios from 'axios'
import { Dropdown, Menu } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const MenuItemUser = () => {
  const router = useRouter()
  const [user, setUser]: any = useState({})

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`, {
        withCredentials: true,
      }).then((res) => setUser(res.data))
      // .catch(() => router.push('/'))
      .catch(() => console.log('TODO: 로그인 연동 이후 추가 개발'))
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        withCredentials: true,
      })
      await router.push('/login')
    } catch (err) {
      alert('로그아웃에 실패했습니다.')
      console.log(err)
    }
  }

  // TODO: refine this component, after login API sync
  return (
    <Menu.Item position={'right'}>
      <Dropdown text={'개발중!'}>
        <Dropdown.Menu>
          <Dropdown.Item text={'로그아웃'} onClick={handleLogout}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default MenuItemUser