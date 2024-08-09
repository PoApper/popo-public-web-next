import React, { useEffect, useState } from 'react';
import { PoPoAxios } from '@/lib/axios.instance';
import styled from 'styled-components';

import { IFavoritePlace } from '@/types/favorite.interface';
import { IPlace } from '@/types/reservation.interface';

const FavoriteBoxes = ({ userId }: { userId: string }) => {
  const [placeIds, setPlaceIds] = useState([]);
  const [placeInfos, setPlaceInfos] = useState([] as IPlace[]);
  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      try {
        const response = await PoPoAxios.get(
          `/favorite-place/user_id/${userId}`,
        );
        console.log('response.data:', response.data);
        const placeIds = response.data.map(
          (place: IFavoritePlace) => place.place_id,
        );
        setPlaceIds(placeIds);
      } catch (error) {
        console.error('Error fetching favorite places:', error);
      }
    };

    const fetchPlaceInfos = async (placeId: string) => {
      try {
        const response = await PoPoAxios.get(`/place/${placeId}`);
        setPlaceInfos([...placeInfos, response.data]);
      } catch (error) {
        console.error('Error fetching place info:', error);
      }
    };

    fetchFavoritePlaces();
    placeIds.forEach((placeId: string) => fetchPlaceInfos(placeId));
  }, [userId]);

  return (
    <div>
      {placeInfos.map((placeInfo: IPlace) => (
        <FavoriteCard key={placeInfo.uuid}>{placeInfo.name}</FavoriteCard>
      ))}
    </div>
  );
};

export default FavoriteBoxes;

const FavoriteCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 14px;
`;
