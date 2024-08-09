import React from 'react';
import styled from 'styled-components';

import { IPlace } from '@/types/favorite.interface';

const FavoritePlaceBoxes = ({ placeList }: { placeList: IPlace[] }) => {
  return (
    <div>
      {placeList.map((place: IPlace) => (
        <FavoriteCard key={place.uuid}>{place.name}</FavoriteCard>
      ))}
    </div>
  );
};

export default FavoritePlaceBoxes;

const FavoriteCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 14px;
`;
