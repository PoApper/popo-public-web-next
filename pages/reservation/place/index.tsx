import { Card, Grid, Icon, Image } from 'semantic-ui-react'
import Layout from '@/components/layout'

const PlaceIndexPage = () => {
  return (
    <Layout>
      <h2>장소 예약</h2>
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
          <Card href={'/reservation/place/community-center'} centered>
            <Image src={'/reservation/community_center.jpg'} alt={'community_center'}/>
            <Card.Content>
              <Card.Header>커뮤니티 센터</Card.Header>
              <Card.Meta>Community Center</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'/reservation/place/residential-college'} centered>
            <Image src={'/reservation/rc.jpg'} alt={'rc'}/>
            <Card.Content>
              <Card.Header>RC</Card.Header>
              <Card.Meta>Residential College</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'/reservation/place/others'} centered>
            <Image src={'/reservation/dormitory.jpg'} alt={'others'}/>
            <Card.Content>
              <Card.Header>기타</Card.Header>
              <Card.Meta>etc</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>

        </Grid.Column>
      </Grid>
      <h2>기타 예약</h2>
      <Grid stackable columns={3}>
        <Grid.Column>
          <Card href={'https://zzim.postech.ac.kr'} centered>
            <Card.Content style={{'display': 'flex', 'align-items':'center'}}>
              <Icon style={{'margin-right': '10px'}} color='black' name='book'/>
              <div>
                <Card.Header style={{'color':'black', 'font-weight':'bold'}}>박태준 학술 정보관</Card.Header>
                <Card.Meta>Tae-joon Park Digital Library</Card.Meta>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card href={'https://povis.postech.ac.kr/'} centered>
            <Card.Content style={{'display': 'flex', 'align-items':'center'}}>
              <Icon style={{'margin-right': '10px'}} color='black' name='building'/>
              <div>
                <Card.Header style={{'color':'black', 'font-weight':'bold'}}>강의실 및 체육시설</Card.Header>
                <Card.Meta>POVIS 신고신청 {'>'} 시설이용</Card.Meta>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default PlaceIndexPage