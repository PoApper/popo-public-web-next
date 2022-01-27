import {Card, Grid, Image} from "semantic-ui-react";
import Layout from "../../../components/layout";
import DongyeonImage from "../../../public/equip/dongyeon.png";
import DormUnionImage from "../../../public/equip/dormUnion.png";
import SaengnaImage from "../../../public/equip/saengna.jpg";

const EquipmentPage = () => {
    return (
        <Layout>
            <div>
                <Grid stackable>
                    <Grid.Row centered columns={3}>
                        <Grid.Column>
                            <Card href={'equip/dongyeon'} centered>
                                <Image src={DongyeonImage}/>
                                <Card.Content>
                                    <Card.Header>동아리연합회</Card.Header>
                                    <Card.Meta>Student Club Union</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'equip/dorm-union'} centered>
                                <Image src={DormUnionImage}/>
                                <Card.Content>
                                    <Card.Header>생활관자치회</Card.Header>
                                    <Card.Meta>Dormitory Union</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'equip/saengna'} centered>
                                <Image src={SaengnaImage}/>
                                <Card.Content>
                                    <Card.Header>생각나눔</Card.Header>
                                    <Card.Meta>Committee Advisory Council</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Layout>
    )
}

export default EquipmentPage