import Layout from '@/components/layout'
import { Grid, Image } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

interface AssociationIntroduce {
  name: string;
  content: string;
  location: string;
  representative: string;
  contact: string;
  logoName: string;
}

const AssociationIndexPage = () => {
  const [introList, setIntroList] = useState<AssociationIntroduce[]>([])
  const COL_NUM = 4;

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/introduce/association`).
      then(res => {
        for (let i = 0; i < res.data.length % COL_NUM; i++) {
          res.data.push(null)
        }
        setIntroList(res.data)
      }).
      catch(() => alert('소개글을 불러오는데 실패했습니다.'))
  }, [])

  return (
    <Layout>
      <Grid textAlign="center" stackable columns={COL_NUM}>
        {
          introList.map((intro, idx) => {
            if (!intro) return <Grid.Column/>
            return (
              <Grid.Column key={idx} >
                <div>
                  <Image
                    centered size="small"
                    href={`/association/introduce/${intro.name}`}
                    src={
                      intro.logoName ?
                        `${process.env.NEXT_PUBLIC_API}/introduce/association/image/${intro.logoName}`
                        : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                    alt={`${intro.name}_logo`}
                  />
                  <AssociationName>{intro.name}</AssociationName>
                </div>
              </Grid.Column>
            )
          })
        }
      </Grid>
    </Layout>
  )
}

export default AssociationIndexPage

const AssociationName = styled.h3`
  word-break: keep-all;
`