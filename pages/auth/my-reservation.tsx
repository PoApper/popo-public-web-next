import { Container } from 'semantic-ui-react'
import Layout from '../../components/layout'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import MyPlaceReservationTable
  from '../../components/auth/MyPlaceReservationTable'
import MyEquipReservationTable
  from '../../components/auth/MyEquipReservationTable'

const MyInfoPage = () => {
  const router = useRouter()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true }).
      catch(() => {}) // TODO: add alert and redirect to login
  }, [router])

  return (
    <Layout>
      <Container style={{
        padding: '40px',
        margin: '2em 0 4em',
        backgroundColor: '#eeeeee',
        borderRadius: '8px',
      }}>
        <h2>내 예약</h2>
        <h3>장소 예약</h3>
        <MyPlaceReservationTable/>
        <h3>장비 예약</h3>
        <MyEquipReservationTable/>
      </Container>
    </Layout>
  )
}

export default MyInfoPage