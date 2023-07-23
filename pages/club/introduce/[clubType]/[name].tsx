import { GetServerSideProps } from 'next'
import React from 'next/router'
import { Container, Grid, Image } from 'semantic-ui-react'

import Layout from '@/components/layout'
import IconLink from '@/components/common/icon.link'
import { IClubIntroduce } from '@/types/introduce.interface'
import { PoPoAxios } from '@/lib/axios.instance'

const ClubSingleIntroducePage: React.FunctionComponent<{
  name: string,
  clubInfo: IClubIntroduce,
}> = ({ name, clubInfo }) => {
  return (
    <Layout>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={12}>
            <h1 style={{margin: 0}}>
              {name}
            </h1>
            <h3 style={{margin: "0 0 10px", color: 'gray'}}>{clubInfo.short_desc}</h3>

            <Container style={{fontSize: 18, display: 'inline-flex', gap: 2}}>
              <IconLink link={clubInfo.homepage_url}>
                <img src={'https://img.shields.io/badge/website-000000?style=for-the-badge'}
                     alt={'homepage'}/>
              </IconLink>
              <IconLink link={clubInfo.facebook_url}>
                <img src={'https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white'}
                     alt={'facebook'}/>
              </IconLink>
              <IconLink link={clubInfo.instagram_url}>
                <img src={'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white'}
                     alt={'instagram'}/>
              </IconLink>
              <IconLink link={clubInfo.youtube_url}>
                <img src={'https://img.shields.io/badge/Youtube-E4405F?style=for-the-badge&logo=youtube&logoColor=white'}
                     alt={'youtube'}/>
              </IconLink>
            </Container>

            <Container style={{fontSize: 16}}>
              {clubInfo.content}
            </Container>

            <br/>

            <Container>
              <p>
                <b>동방 위치</b>: {clubInfo.location}
              </p>
              <p>
                <b>대표자</b>: {clubInfo.representative}({clubInfo.contact})
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image
              centered size='small'
              src={clubInfo.image_url ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              alt={`${name}_logo`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default ClubSingleIntroducePage;

export const getServerSideProps: GetServerSideProps  = async (context) => {
  const name = context.query['name'] as string;

  const res = await PoPoAxios.get<IClubIntroduce>(`introduce/club/name/${name}`);
  const clubInfo = res.data;

  return {
    props: { name, clubInfo }
  };
};
