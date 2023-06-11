import React, { useRouter } from 'next/router'
import { Button, Card, Icon } from 'semantic-ui-react'
import { useEffect, useState } from 'react'

import Layout from '@/components/layout'
import { IPlace } from '@/types/reservation.interface'
import { PoPoAxios } from '@/lib/axios.instance'

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

const PlaceRegionIndexPage: React.FunctionComponent = () => {
  const router = useRouter()
  const region = router.query.region as string
  const [places, setPlaces] = useState<IPlace[]>([])

  useEffect(() => {
    if (!region) return

    PoPoAxios.get(
      `/place/region/${regionOptions[region]}`).
      then((res) => {
        setPlaces(res.data)
      })
  }, [region])

  return (
    <Layout>
      <div>
        <h1>{regionName[region]} - 장소 예약하기</h1>
        {
          places ?
            <Card.Group>
              {
                places.map(place => {
                  return (
                    <Card fluid key={place.uuid}>
                      <Card.Content>
                        <Card.Header>{place.name}</Card.Header>
                        <Card.Meta>{place.location}</Card.Meta>
                        <Card.Description>{place.description}</Card.Description>
                        <Card.Description style={{ marginTop: '0.8em' }}>
                          <Button
                            href={`/reservation/place/${region}/${place.name}`}
                            basic compact>
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

export default PlaceRegionIndexPage