import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PoPoAxios } from '@/lib/axios.instance';

import Layout from '@/components/layout';
import FavoritePlaceBoxes from '@/components/favorite/favoritePlaceBoxes';

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

  useEffect(() => {
    PoPoAxios.get('/auth/myInfo', { withCredentials: true })
      .then((res) => setMyInfo(res.data))
      .catch(() => {
        alert('로그인 후 조회할 수 있습니다.');
        router.push('/auth/login');
      });
  }, [router]);

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
        <FavoritePlaceBoxes
          userId={myInfo.email.replace('@postech.ac.kr', '')}
        />
      </Container>
    </Layout>
  );
};

export default MyInfoPage;
