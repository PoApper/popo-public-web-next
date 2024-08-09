import React, { useEffect, useState } from 'react';
import { PoPoAxios } from '@/lib/axios.instance';
import styled from 'styled-components';

import { IPlace } from '@/types/reservation.interface';

const FavoriteBox = ({ placeIds }: { placeIds: string[] }) => {
  const [placeInfos, setPlaceInfos] = useState([] as IPlace[]);
  useEffect(() => {
    const fetchPlaceInfos = async (placeId: string) => {
      try {
        const response = await PoPoAxios.get(`/place/${placeId}`);
        setPlaceInfos((prevPlaceInfos) => [...prevPlaceInfos, response.data]);
      } catch (error) {
        console.error('Error fetching place info:', error);
      }
    };
    placeIds.forEach((placeId: string) => fetchPlaceInfos(placeId));
  }, []);

  return (
    <div>
      {placeInfos.map((placeInfo: IPlace) => (
        <FavoriteCard key={placeInfo.uuid}>{placeInfo.name}</FavoriteCard>
      ))}
    </div>
  );
};

export default FavoriteBox;

const FavoriteCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 14px;
`;
