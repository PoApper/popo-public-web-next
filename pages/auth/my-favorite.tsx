import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PoPoAxios } from '@/lib/axios.instance';

import Layout from '@/components/layout';
import FavoritePlaceBoxes from '@/components/favorite/favoritePlaceBoxes';

import { IPlace, IFavoritePlace } from '@/types/favorite.interface';

interface MyInformation {
  email: string;
  name: string;
  userType: string;
  createdAt: Date;
}

const MyInfoPage = () => {
  const router = useRouter();

  const [myInfo, setMyInfo] = useState<MyInformation>({
    email: '',
    name: '',
    userType: '',
    createdAt: new Date(),
  });
  const [placeList, setPlaceList] = useState([] as IPlace[]);

  useEffect(() => {
    PoPoAxios.get('/auth/myInfo', { withCredentials: true })
      .then((res) => setMyInfo(res.data))
      .catch(() => {
        alert('로그인 후 조회할 수 있습니다.');
        router.push('/auth/login');
      });

    const fetchFavoritePlaces = async (userId: string) => {
      try {
        const favoritePlacesRes = await PoPoAxios.get<IFavoritePlace[]>(
          `/favorite-place/user_id/${userId}`,
        );
        const favoritePlaces = favoritePlacesRes.data;
        console.log('favoritePlaces:', favoritePlaces);

        if (favoritePlaces.length > 0) {
          favoritePlaces.map((favoritePlace) => {
            PoPoAxios.get<IPlace>(`/place/${favoritePlace.place_id}`)
              .then((res) => {
                setPlaceList((prev) => [...prev, res.data]);
              })
              .catch((error) => {
                console.error('Error fetching place information:', error);
              });
          });
        }
      } catch (error) {
        console.error('Error fetching favorite places:', error);
      }
    };
    if (myInfo.email) {
      fetchFavoritePlaces(myInfo.email.replace('@postech.ac.kr', ''));
    }
  }, [router, myInfo.email]);

  return (
    <Layout>
      <Container
        style={{
          padding: '40px',
          margin: '2em 0 4em',
          backgroundColor: '#eeeeee',
          borderRadius: '8px',
        }}
      >
        <h2>내 즐겨찾기</h2>
        <FavoritePlaceBoxes placeList={placeList} />
      </Container>
    </Layout>
  );
};

export default MyInfoPage;
