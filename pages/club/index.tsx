import Layout from '@/components/layout'
import { Card, Image } from 'semantic-ui-react'
import styled from 'styled-components'

const ClubIndexPage = () => {
  const clubTypes = [
    {slug: 'performance1', name: '공연1'},
    {slug: 'performance2', name: '공연2'},
    {slug: 'sports', name: '체육'},
    {slug: 'hobbyAndExhibition', name: '취미전시'},
    {slug: 'study', name: '학술'},
    {slug: 'societyAndReligion', name: '사회종교'},
  ]

  return (
    <Layout>
      <ClubTypesGrid>
        {
          clubTypes.map(({slug, name}) => (
            <Card key={slug} href={`/club/introduce/${slug}`} style={{margin: '0 auto'}}>
              <Card.Content style={{height: "12em"}}>
                <Image src={`club/${slug}.svg`} alt={slug}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
              </Card.Content>
            </Card>
          ))
        }
      </ClubTypesGrid>
    </Layout>
  )
}

export default ClubIndexPage;

const ClubTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: 2rem;

  // mobile screen
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
