import { Container, Grid, Image } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import IconLink from '@/components/common/icon.link'
import { IAssociationIntroduce, } from '@/types/introduce.interface'

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
    if (!name) return;
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
            <h1 style={{marginBottom: 8}}>
              {name}
            </h1>

            <Container style={{fontSize: 18, display: 'inline-flex', gap: 2}}>
              <IconLink link={intro.homepage_url}>
                <img src={'https://img.shields.io/badge/website-000000?style=for-the-badge'}
                     alt={'homepage'}/>
              </IconLink>
              <IconLink link={intro.facebook_url}>
                <img src={'https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white'}
                     alt={'facebook'}/>
              </IconLink>
              <IconLink link={intro.instagram_url}>
                <img src={'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white'}
                     alt={'instagram'}/>
              </IconLink>
            </Container>

            <Container style={{fontSize: 16}}>
              {intro.content}
            </Container>
            <br/>
            <Container>
              <p>
                <b>사무실 위치</b>: {intro.location}
              </p>
              <p>
                <b>대표자</b>: {intro.representative}({intro.contact})
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
