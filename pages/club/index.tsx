import Layout from '../../components/layout'
import { Card, Grid, Image } from 'semantic-ui-react'

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
      <Grid stackable style={{textAlign: "center"}} rows={2} columns={3}>
        {
          clubTypes.map(({slug, name}) => {
            return (
              <Grid.Column key={slug}>
                <Card href={`/club/introduce/${slug}`}>
                  <Card.Content style={{height: "12em"}}>
                    <Image src={`club/${slug}.svg`} alt={slug}
                           style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                  </Card.Content>
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            )
          })
        }
      </Grid>
    </Layout>
  )
}

export default ClubIndexPage
