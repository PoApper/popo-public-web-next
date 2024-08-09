import React from 'react';
import { PoPoAxios } from '@/lib/axios.instance';
import {
  Card,
  Grid,
  Image,
  Button,
  Icon,
  ButtonGroup,
} from 'semantic-ui-react';

import { IPlace } from '@/types/favorite.interface';

const FavoritePlaceBoxes = ({ placeList }: { placeList: IPlace[] }) => {
  const handleDelete = async (deleteURI: string) => {
    PoPoAxios.delete(`/${deleteURI}`, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        alert(`삭제에 실패했습니다.\n${errMsg}`);
      });
  };

  return (
    <Grid stackable centered columns={3} style={{ maxWidth: 1000 }}>
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
              <ButtonGroup>
                <Button
                  icon
                  labelPosition="left"
                  onClick={() =>
                    handleDelete(`favorite-place/${place.favorite_id}`)
                  }
                >
                  <Icon name="cancel" />
                  삭제하기
                </Button>
                <Button icon labelPosition="right">
                  예약하기
                  <Icon name="arrow right" />
                </Button>
              </ButtonGroup>
            </Card.Content>
          </Card>
          <Card
            href={`/reservation/place/${place.region}/${place.name}`}
            centered
          >
            <Card.Content style={{ display: 'flex', 'align-items': 'center' }}>
              <div>
                <Card.Header style={{ color: 'black', 'font-weight': 'bold' }}>
                  {place.name}
                </Card.Header>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
      {placeList.length < 3 && (
        <Grid.Column>
          <Card href={`/reservation/place`} centered>
            <Card.Content style={{ display: 'flex', 'align-items': 'center' }}>
              <div>
                <Card.Header style={{ color: 'black', 'font-weight': 'bold' }}>
                  더 많은 장소 보기
                </Card.Header>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default FavoritePlaceBoxes;
