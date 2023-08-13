import Layout from '@/components/layout'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import AffiliateCards from '@/components/benefits/affiliate.cards'
import DiscountOfferCards from '@/components/benefits/discount.cards'

import { affiliates, discountOffers } from 'assets/affiliate.data'

const BenefitsIndexPage = () => {
  return (
    <Layout>
      <h3>총학생회 제휴 업체 소개</h3>
        <AffiliateCards
          affiliates={affiliates}
        />
      <AffiliateDivider/>
      <h3>총학생회 할인 업체 소개</h3>
        <DiscountOfferCards
          discountOffers={discountOffers}
        />
    </Layout>
  )
}

export default BenefitsIndexPage

const AffiliateDivider = styled(Divider)` 
  min-height: 10px;
  margin: 20px 20px 0px 0px;
  padding: 0px 0px 0px 0px;
`