import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { Grid, Image, Card, Button } from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components'
import Link from 'next/link'

const StoreIndexPage = () => {
  const [selectedRegion, setRegion] = useState('all')
  const [stores, setStores] = useState<any[]>([])
  
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_INPOSTACK_API}/store`)
      .then(res => setStores(res.data))
      .catch(() => alert(`가게 목록을 불러오는데 실패했습니다.`))
  }, [])

  return (
    <Layout>
      <StoreInfoContainer>
      <h2>제휴 업체 목록</h2>
      <Button.Group style={{'paddingBottom' : '1rem'}}>
        <Button onClick={() => setRegion('all')}>ALL</Button>
        <Button onClick={() => setRegion('hyo-ja')}>효자 시장</Button>
        <Button onClick={() => setRegion('sk-view')}>SK 뷰</Button>
        <Button onClick={() => setRegion('yi-dong')}>이동</Button>
        <Button onClick={() => setRegion('ji-gok')}>지곡</Button>
        <Button onClick={() => setRegion('yu-gang')}>유강</Button>
        <Button onClick={() => setRegion('others')}>etc</Button>
      </Button.Group>
      </StoreInfoContainer>
     <Grid stackable style={{textAlign: "center"}} columns={4}>
      {stores.map(store => {
        if (store.label=='총학제휴' && (selectedRegion == 'all' || selectedRegion == store.region)) {
          return (
          <Grid.Column key={store.uuid}>
              <Link href={`/store/${store.name}`} key={store.uuid} passHref>
                <Card>
                <Image src={store.image_url ?? 'https://via.placeholder.com/360?text=POPO'} alt={store.name}/>
                <Card.Content>
                    <Card.Header>{store.name}</Card.Header>
                    <Card.Description>{store.description}</Card.Description>
                </Card.Content>
                </Card>
              </Link>
          </Grid.Column>
          )}
        })
      }
      </Grid>
    </Layout>
  )
}

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content : center;
  align-items : center;
`

export default StoreIndexPage