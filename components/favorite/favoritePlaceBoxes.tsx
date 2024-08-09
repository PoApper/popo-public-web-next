import React, { useEffect, useState } from 'react';
import { PoPoAxios } from '@/lib/axios.instance';

import { IFavoritePlace } from '@/types/favorite.interface';
import FavoriteBox from '@/components/favorite/favoritePlaceBox';

const FavoriteBoxes = ({ userId }: { userId: string }) => {
  const [placeIds, setPlaceIds] = useState([]);
  useEffect(() => {
    PoPoAxios.get(`/favorite-place/user_id/${userId}`)
      .then((res) => {
        console.log(userId);
        setPlaceIds(res.data.map((place: IFavoritePlace) => place.place_id));
      })
      .catch((err) => {
        console.error('Error fetching favorite places:', err);
      });
  }, [userId]);

  return <FavoriteBox placeIds={placeIds} />;
};

export default FavoriteBoxes;
