import { GetServerSideProps } from 'next'
import React from 'next/router'
import { Container, Grid, Image } from 'semantic-ui-react'

import Layout from '@/components/layout'
import IconLink from '@/components/common/icon.link'
import { IAssociationIntroduce, } from '@/types/introduce.interface'
import { PoPoAxios } from '@/lib/axios.instance'

const AssociationSingleIntroducePage: React.FunctionComponent<{
  name: string,
  associationInfo: IAssociationIntroduce,
}> = ({ name, associationInfo }) => {
  return (
    <Layout>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <h1 style={{marginBottom: 8}}>
              {name}
            </h1>

            <Container style={{fontSize: 18, display: 'inline-flex', gap: 2}}>
              <IconLink link={associationInfo.homepage_url}>
                <img src={'https://img.shields.io/badge/website-000000?style=for-the-badge'}
                     alt={'homepage'}/>
              </IconLink>
              <IconLink link={associationInfo.facebook_url}>
                <img src={'https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white'}
                     alt={'facebook'}/>
              </IconLink>
              <IconLink link={associationInfo.instagram_url}>
                <img src={'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white'}
                     alt={'instagram'}/>
              </IconLink>
            </Container>

            <Container style={{fontSize: 16}}>
              {associationInfo.content}
            </Container>
            <br/>
            <Container>
              <p>
                <b>사무실 위치</b>: {associationInfo.location}
              </p>
              <p>
                <b>대표자</b>: {associationInfo.representative}({associationInfo.contact})
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column width={6}>
            <Image
              centered size="small"
              src={associationInfo.image_url ?? 'https://react.semantic-ui.com/images/wireframe/image.png'}
              alt={`${name}_logo`}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default AssociationSingleIntroducePage;

export const getServerSideProps: GetServerSideProps  = async (context) => {
  const name = context.query['name'] as string;

  const res = await PoPoAxios.get<IAssociationIntroduce>(`introduce/association/name/${name}`);
  const associationInfo = res.data;

  return {
    props: { name, associationInfo }
  };
};

