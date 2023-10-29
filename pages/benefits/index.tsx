import React from "react";
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import Layout from '@/components/layout'
import AffiliateCards from '@/components/benefits/affiliate.cards'
import DiscountOfferCards from '@/components/benefits/discount.cards'
import {PoPoAxios} from "@/lib/axios.instance";
import {IAffiliate, IDiscount} from "@/types/benefit.interface";

const BenefitsIndexPage: React.FunctionComponent<{
  affiliateList: IAffiliate[],
  discountList: IDiscount[],
}> = ({ affiliateList, discountList }) => {
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

export async function getServerSideProps() {
  const res1 = await PoPoAxios.get('benefit/affiliate');
  const affiliateList = res1.data;

  const res2 = await PoPoAxios.get('benefit/discount');
  const discountList = res2.data;

  return { props: { affiliateList, discountList } }
}


const AffiliateDivider = styled(Divider)` 
  min-height: 10px;
  margin: 20px 20px;
  padding: 0;
`
