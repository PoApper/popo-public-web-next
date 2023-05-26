import Layout from '@/components/layout'
import { Container, Grid, Image } from 'semantic-ui-react'
import Link from "next/link";

const HomePage = () => {
  const isDayTime = (9 <= (new Date().getHours()) && (new Date().getHours()) <= 18);

  return (
    <Layout>
      <div style={{background: "#eeeeee", borderRadius: "0.4em"}}>
        <Grid stackable style={{padding: "1rem 1.2rem"}}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Container style={{fontSize: "1em"}}>
                <h1 style={{fontFamily: "Caveat"}}>POPO, POstechian&apos;s POrtal</h1>
                <p>이곳에서 학생회관, 지곡회관 등의 장소를 예약하고, 총학생회에서 보유한 장비들을 대여할 수 있습니다! 📋
                  &nbsp;<Link href={"/reservation"} passHref>[장비/장소 예약]</Link>
                </p>
                <p>총학생회를 구성하는 자치단체에 대해 살펴볼 수 있습니다! 👀
                  &nbsp;<Link href={"/association"} passHref>[총학생회]</Link>
                </p>
                <p>교내 동아리 역시 POPO에서 확인할 수 있습니다! 🎨
                  &nbsp;<Link href={"/club"} passHref>[동아리]</Link>
                </p>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Image rounded centered
                     src={isDayTime ? 'index/home_background_day.jpg' : 'index/home_background_night.jpg'}
                     alt={'background_image'}
                     width={"100%"}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  )
}

export default HomePage
