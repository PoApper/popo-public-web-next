import {Card, Grid} from "semantic-ui-react";

const PlacePage = () => {
    return (
        <div>
            <Grid>
                <Grid.Row centered columns={3}>
                    <Grid.Column>
                        <Card href={'place/student-hall'} centered>
                            <Card.Content>
                                <Card.Header>학생회관</Card.Header>
                                <Card.Meta>Student Hall</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card href={'place/jigok'} centered>
                            <Card.Content>
                                <Card.Header>지곡회관</Card.Header>
                                <Card.Meta>Ji-gok Community Center</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card href={'place/others'} centered>
                            <Card.Content>
                                <Card.Header>생활관 외</Card.Header>
                                <Card.Meta>Dormitory, etc.</Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default PlacePage