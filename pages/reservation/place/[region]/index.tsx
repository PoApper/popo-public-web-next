import React from 'next/router'
import { Button, Card, Icon } from 'semantic-ui-react'

import Layout from '@/components/layout'
import { IPlace } from '@/types/reservation.interface'
import { PoPoAxios } from '@/lib/axios.instance'
import { GetServerSideProps } from 'next'

type ObjectType = {
  [key: string]: string
}

const regionName: ObjectType = {
  'student-hall': '학생 회관',
  'jigok': '지곡 회관',
  'others': '생활관 외',
  'community-center': '커뮤니티 센터',
}

const regionOptions: ObjectType = {
  'student-hall': 'STUDENT_HALL',
  'jigok': 'JIGOK_CENTER',
  'others': 'OTHERS',
  'community-center': 'COMMUNITY_CENTER',
}

const PlaceRegionIndexPage: React.FunctionComponent<{
  region: string,
  placeList: IPlace[]
}> = ({ region, placeList }) => {
  return (
    <Layout>
      <div>
        <h1>{regionName[region]} - 장소 예약하기</h1>
        {
          placeList ?
            <Card.Group>
              {
                placeList.map(place => {
                  return (
                    <Card fluid key={place.uuid}>
                      <Card.Content>
                        <Card.Header>{place.name}</Card.Header>
                        <Card.Meta>{place.location}</Card.Meta>
                        <Card.Description>{place.description}</Card.Description>
                        <Card.Description style={{ marginTop: '0.8em' }}>
                          <Button
                            basic compact
                            href={`/reservation/place/${region}/${place.name}`}
                          >
                            <Icon name={'calendar plus outline'}/> 예약하기
                          </Button>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  )
                })
              }
            </Card.Group> : <p>empty...</p>
        }
      </div>
    </Layout>
  )
}

export default PlaceRegionIndexPage;

export const getServerSideProps: GetServerSideProps  = async (context) => {
  const region = context.query['region'] as string;

  const res = await PoPoAxios.get<IPlace[]>(`place/region/${regionOptions[region]}`);
  const placeList = res.data;

  return {
    props: { region, placeList }
  };
};
