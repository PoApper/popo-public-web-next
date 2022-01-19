import Layout from '../../components/layout'
import { Card, Grid, Image } from 'semantic-ui-react'

const ClubIndexPage = () => {
  return (
    <Layout>
      <Grid stackable style={{textAlign: "center"}} columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Card href={"/club/introduce/performance1"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/performance1.svg'} alt={'performance1'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>공연1</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={"/club/introduce/performance2"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/performance2.svg'} alt={'performance2'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>공연2</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={"/club/introduce/sports"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/sports.svg'} alt={'sports'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>체육</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card href={"/club/introduce/hobbyAndExhibition"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/hobbyAndExhibition.svg'} alt={'hobbyAndExhibition'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>취미전시</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={"/club/introduce/study"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/study.svg'} alt={'study'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>학술</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={"/club/introduce/societyAndReligion"}>
              <Card.Content style={{height: "12em"}}>
                <Image src={'club/societyAndReligion.svg'} alt={'societyAndReligion'}
                       style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
              </Card.Content>
              <Card.Content>
                <Card.Header>사회종교</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default ClubIndexPage
