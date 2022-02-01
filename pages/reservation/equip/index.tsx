import {Card, Grid, Image} from "semantic-ui-react";
import Layout from "../../../components/layout";

const EquipmentPage = () => {
    return (
        <Layout>
            <div>
                <Grid stackable>
                    <Grid.Row centered columns={3}>
                        <Grid.Column>
                            <Card href={'equip/dongyeon'} centered>
                                <Image src={"/equip/dongyeon.png"}/>
                                <Card.Content>
                                    <Card.Header>동아리연합회</Card.Header>
                                    <Card.Meta>Student Club Union</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'equip/dorm-union'} centered>
                                <Image src={"/equip/dormUnion.png"}/>
                                <Card.Content>
                                    <Card.Header>생활관자치회</Card.Header>
                                    <Card.Meta>Dormitory Union</Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card href={'equip/saengna'} centered>
                                <Image src={"/equip/saengna.jpg"}/>
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