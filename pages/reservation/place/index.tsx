import {Card, Grid, Image} from "semantic-ui-react";
import Layout from "../../../components/layout";
import StudentHallImage from "../../../public/place/student_hall.jpg";
import JigokImage from "../../../public/place/jigok.jpg";
import EtcImage from "../../../public/place/dormitory_img.jpg";

const PlacePage = () => {
    return (
        <Layout>
            <div>
                <Grid>
                    <Grid.Row centered columns={3}>
                        <Grid.Column>
                            <Card href={'place/student-hall'} centered>
                                <Image src={StudentHallImage}/>
                                <Card.Content>
                                    <Card.Header>학생회관</Card.Header>
                                    <Card.Meta>Student Hall</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'place/jigok'} centered>
                                <Image src={JigokImage}/>
                                <Card.Content>
                                    <Card.Header>지곡회관</Card.Header>
                                    <Card.Meta>Ji-gok Community Center</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'place/others'} centered>
                                <Image src={EtcImage}/>
                                <Card.Content>
                                    <Card.Header>생활관 외</Card.Header>
                                    <Card.Meta>Dormitory, etc.</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Layout>
    )
}

export default PlacePage