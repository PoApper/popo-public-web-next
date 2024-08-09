import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';

import { IPlace } from '@/types/favorite.interface';

const FavoritePlaceBoxes = ({ placeList }: { placeList: IPlace[] }) => {
  return (
    <Grid stackable centered columns={3} style={{ maxWidth: 900 }}>
      {placeList.map((place: IPlace) => (
        <Grid.Column key={place.uuid}>
          <Card
            href={`/reservation/place/${place.region}/${place.name}`}
            centered
          >
            <Image src={place.image_url} alt={place.name} />
            <Card.Content>
              <Card.Header>{place.name}</Card.Header>
              <Card.Meta>{place.region}</Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default FavoritePlaceBoxes;
