import { Container, Grid, Icon, Image, List } from 'semantic-ui-react'
import CountUp from 'react-countup'
import Link from 'next/link'
import Layout from '@/components/layout'

// TODO: this page was deprecated in popo-public v2
// TODO: move this to index page

const ReservationHome = () => {
  const generateAnimatedNumber = (number: number) => {
    return <CountUp end={number} duration={0.7}/>
  }

  return (
    <Layout>
      <section>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Container style={{ fontSize: '1em' }}>
                <br/>
                <h1 style={{ marginBottom: '1em' }}>
                  <span>POPO</span>에서<br/>
                  <big>{generateAnimatedNumber(17)}</big> 곳의
                  장소와 <big>{generateAnimatedNumber(35)}</big> 개의 장비를<br/>예약할 수
                  있습니다!
                </h1>
                <p>
                  <b>POSTECH 총학생회</b>는<br/>
                  학생 복지를 위해 장소를 개방하고 물품을 공유하고 있습니다 🙌
                </p>
                <List>
                  <List.Item>
                    장소 예약하기 <Link href={'/reservation/place'}><Icon
                    name={'linkify'}/></Link>
                  </List.Item>
                  <List.Item>
                    장비 예약하기 <Link href={'/reservation/equip'}><Icon
                    name={'linkify'}/></Link>
                  </List.Item>
                </List>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Image centered src={'/booking_illustration.svg'} size={'large'}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    </Layout>
  )
}

export default ReservationHome