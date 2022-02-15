import { Container, Grid, Icon, Image, Popup } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '../../../components/layout'
import { IAssociationIntroduce } from '../../../types/introduce.interface'

const AssociationSingIntroducePage = () => {
  const router = useRouter()
  const { name } = router.query
  const [intro, setIntro] = useState<IAssociationIntroduce>({
    content: '',
    location: '',
    representative: '',
    contact: '',
    logoName: '',
  })

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/introduce/association/name/${name}`).
      then(res => setIntro(res.data)).
      catch(() => alert('소개글을 불러오는데 실패했습니다.'))
  }, [name])

  return (
    <Layout>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <h1>{name}</h1>
            <Container>
              {intro.content}
            </Container>
            <br/>
            <Container>
              <p>
                <b>사무실 위치</b>: {intro.location}
              </p>
              <p>
                <b>대표자</b>: {intro.representative} &nbsp;
                <Popup content={intro.contact} trigger={<Icon name={'mail'}/>}/>
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column width={6}>
            <Image
              centered size="small"
              src={
                intro.logoName ?
                  `${process.env.NEXT_PUBLIC_API}/introduce/association/image/${intro.logoName}`
                  : 'https://react.semantic-ui.com/images/wireframe/image.png'
              }
              alt={`${name}_logo`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default AssociationSingIntroducePage
