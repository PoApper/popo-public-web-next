import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Image, Icon, Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import Layout from '@/components/layout'
import StoreOpeningHours from '@/components/store/storeOpeningHours'
import { InPoStackAxios } from '@/lib/axios.instance'

const StorePage = () => {
  const router = useRouter();
  const store_name = router.query.name
  const [storeWithAll, setStoreWithAll] = useState<any>()

  useEffect(() => {
    if (!store_name) return;
    InPoStackAxios
      .get(`/store/name/${store_name}?category=true&menu=true`,
        {withCredentials: true})
      .then(res => setStoreWithAll(res.data))
      .catch(() => alert(`가게 정보를 불러오는데 실패했습니다.`))
  }, [store_name])

  return (
    <Layout>
      {
        storeWithAll ? (
          <StoreInfoContainer>
          <StoreLogo>
            <h2 style={{ display: 'flex', alignItems: 'center' }}>
              {store_name}
            </h2>
          <Image
            src={storeWithAll.image_url ?? 'https://via.placeholder.com/360?text=POPO'}
            alt={'food_img'}
            width={360} height={360}
            centered
            style={{borderRadius: "15px"}}
          />
          </StoreLogo>
          <StoreInfo>
            <p>
              <div style={{display: 'flex'}}><Icon name={"call"} /> {storeWithAll.phone ? <div>{storeWithAll.phone}</div> : <span className={'blurry-text'}>정보 수집중</span>}</div>
            </p>
            <p>
              <Icon name={"clock"} />
              {storeWithAll.opening_hours ? <StoreOpeningHours openingHours={storeWithAll.opening_hours}/> : <span className={'blurry-text'}>정보 수집중</span>}
            </p>
            <p>
              <Icon name={"home"} /> {storeWithAll.address1} {storeWithAll.address2}
            </p>
            <Divider/>
            <p>
              {storeWithAll.description}
            </p>
        </StoreInfo>
      </StoreInfoContainer>
        ) : (
          <h1>해당 가게는 존재하지 않습니다.</h1>
        )
      }
    </Layout>
  )
}

const StoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin: 0 3rem 3rem 3rem;
  grid-gap: 1rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const StoreLogo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-items: center;
  align-items: center;
  flex: 1;
`

const StoreInfo = styled.div`
  margin-top: 3rem;
  flex: 2;
`

export default StorePage;
