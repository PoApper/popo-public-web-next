import Layout from '../../../../components/layout'
import { Container, Grid, Image } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface ClubIntroduce {
  name: string;
  content: string;
  short_desc: string;
  location: string;
  representative: string;
  contact: string;
  logoName: string;
}

const ClubTypeIndexPage = () => {
  const router = useRouter()
  const { clubType } = router.query
  const [introList, setIntroList] = useState<ClubIntroduce[]>([])
  const COL_NUM = 4;

  useEffect(() => {
    if (!clubType) return;
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/introduce/club/clubType/${clubType}`).
      then(res => {
        for (let i = 0; i < res.data.length % COL_NUM; i++) {
          res.data.push(null)
        }
        setIntroList(res.data)
      }).
      catch(() => alert('소개글을 불러오는데 실패했습니다.'))
  }, [clubType])

  return (
    <Layout>
      <Grid textAlign="center" stackable columns={COL_NUM}>
        {
          introList.map((intro, idx) => {
            if (!intro) return <Grid.Column/>
            return (
              <Grid.Column key={idx}>
                <div>
                  <Container style={{width: "12em", lineHeight: "12em"}}>
                    <Image
                      centered size="small"
                      href={`/club/introduce/${clubType}/${intro.name}`}
                      src={
                        intro.logoName ?
                          `${process.env.NEXT_PUBLIC_API}/introduce/club/image/${intro.logoName}`
                          : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                      alt={`${intro.name}_logo`}
                    />
                  </Container>
                  <h4 style={{margin: "5px 0 0"}}>{intro.name}</h4>
                  <p style={{color: 'gray'}}>{intro.short_desc}</p>
                </div>
              </Grid.Column>
            )
          })
        }
      </Grid>
    </Layout>
  )

}

export default ClubTypeIndexPage
