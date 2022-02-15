import { Card, Grid, Image } from 'semantic-ui-react'
import Layout from '../../../components/layout'

const PlaceIndexPage = () => {
  return (
    <Layout>
      <Grid stackable centered columns={3}>
        <Grid.Column>
          <Card href={'/reservation/place/student-hall'} centered>
            <Image src={'/reservation/student_hall.jpg'} alt={'student_hall'}/>
            <Card.Content>
              <Card.Header>학생회관</Card.Header>
              <Card.Meta>Student Hall</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'/reservation/place/jigok'} centered>
            <Image src={'/reservation/jigok.jpg'} alt={'jigok'}/>
            <Card.Content>
              <Card.Header>지곡회관</Card.Header>
              <Card.Meta>Ji-gok Community Center</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'/reservation/place/others'} centered>
            <Image src={'/reservation/dormitory.jpg'} alt={'others'}/>
            <Card.Content>
              <Card.Header>생활관 외</Card.Header>
              <Card.Meta>Dormitory, etc.</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default PlaceIndexPage