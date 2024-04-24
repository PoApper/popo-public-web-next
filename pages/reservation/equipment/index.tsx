import { Card, Grid, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Layout from '@/components/layout';

const EquipmentIndexPage = () => {
  return (
    <Layout>
      <h2>장비 예약</h2>
      <Grid stackable columns={3} centered>
        <Grid.Column>
          <Card href={'/reservation/equipment/dongyeon'} centered>
            <LogoImage src={'/reservation/dongyeon.png'} alt={'dongyeon'} />
            <Card.Content>
              <Card.Header>동아리연합회</Card.Header>
              <Card.Meta>Student Club Union</Card.Meta>
              <Card.Description>
                마이크, 스피커, 믹서 등의 음향장비, 카메라, 빔 프로젝터 등
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'/reservation/equipment/dormunion'} centered>
            <LogoImage src={'/reservation/dormUnion.png'} alt={'dormUnion'} />
            <Card.Content>
              <Card.Header>생활관자치회</Card.Header>
              <Card.Meta>Dormitory Union</Card.Meta>
              <Card.Description>카트, 공구류</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {/* <Grid.Column>
          <Card href={'/reservation/equipment/saengna'} centered>
            <LogoImage src={'/reservation/saengna.jpg'} alt={'saengna'}/>
            <Card.Content>
              <Card.Header>생각나눔</Card.Header>
              <Card.Meta>Committee Advisory Council</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column> */}
      </Grid>
    </Layout>
  );
};

export default EquipmentIndexPage;

const LogoImage = styled(Image)`
  background-color: white !important;
`;
