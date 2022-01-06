import {Card, Grid} from "semantic-ui-react";

const EquipmentPage = () => {
    return (
        <div>
            <Grid stackable>
                <Grid.Row centered columns={3}>
                    <Grid.Column>
                        <Card href={'equip/dongyeon'} centered>
                            <Card.Content>
                                <Card.Header>동아리연합회</Card.Header>
                                <Card.Meta>Student Club Union</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card href={'equip/dormUnion'} centered>
                            <Card.Content>
                                <Card.Header>생활관자치회</Card.Header>
                                <Card.Meta>Dormitory Union</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card href={'equip/saengna'} centered>
                            <Card.Content>
                                <Card.Header>생각나눔</Card.Header>
                                <Card.Meta>Committee Advisory Council</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default EquipmentPage