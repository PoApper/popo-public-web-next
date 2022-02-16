import { Card, Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import Layout from '../../../components/layout'

const EquipmentIndexPage = () => {
  return (
    <Layout>
      <div>
        <Grid stackable columns={3} centered>
          <Grid.Column>
            <Card href={'/reservation/equipment/dongyeon'} centered>
              <LogoImage src={'/reservation/dongyeon.png'} alt={'dongyeon'}/>
              <Card.Content>
                <Card.Header>동아리연합회</Card.Header>
                <Card.Meta>Student Club Union</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={'/reservation/equipment/dormunion'} centered>
              <LogoImage src={'/reservation/dormUnion.png'} alt={'dormUnion'}/>
              <Card.Content>
                <Card.Header>생활관자치회</Card.Header>
                <Card.Meta>Dormitory Union</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card href={'/reservation/equipment/saengna'} centered>
              <LogoImage src={'/reservation/saengna.jpg'} alt={'saengna'}/>
              <Card.Content>
                <Card.Header>생각나눔</Card.Header>
                <Card.Meta>Committee Advisory Council</Card.Meta>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    </Layout>
  )
}

export default EquipmentIndexPage

const LogoImage = styled(Image)`
  background-color: white !important;
`