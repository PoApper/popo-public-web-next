import Layout from '@/components/layout'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import AffiliateCards from '@/components/benefits/affiliate.cards'
import DiscountOfferCards from '@/components/benefits/discount.cards'
import {PoPoAxios} from "@/lib/axios.instance";

const BenefitsIndexPage = ({ affiliateList, discountList }) => {
  return (
    <Layout>
      <h3>총학생회 제휴 업체 소개</h3>
        <AffiliateCards
          affiliates={affiliateList}
        />
      <AffiliateDivider/>
      <h3>총학생회 할인 업체 소개</h3>
        <DiscountOfferCards
          discountOffers={discountList}
        />
    </Layout>
  )
}

export default BenefitsIndexPage

export async function getServerSideProps(ctx) {
  const res1 = await PoPoAxios.get('benefit/affiliate');
  const affiliateList = res1.data;

  const res2 = await PoPoAxios.get('benefit/discount');
  const discountList = res2.data;

  return { props: { affiliateList, discountList } }
}


const AffiliateDivider = styled(Divider)` 
  min-height: 10px;
  margin: 20px 20px 0px 0px;
  padding: 0px 0px 0px 0px;
`
