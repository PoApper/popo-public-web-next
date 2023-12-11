import { GetServerSideProps } from 'next'
import { Image } from 'semantic-ui-react'
import Link from "next/link";
import styled from 'styled-components';

import Layout from '@/components/layout'
import { INotice } from '@/types/notice.interface';
import { PoPoAxios } from '@/lib/axios.instance';
import NoticePanel from '@/components/notice/notice.panel';

const HomePage: React.FunctionComponent<{
  noticeList: INotice[],
}> = ({ noticeList }) => {
  const isDayTime = (9 <= (new Date().getHours()) && (new Date().getHours()) <= 18);

  return (
    <Layout>
      <HomeLayout>
        <HomeCard>
          <div style={{fontSize: "1em"}}>
            <h1 style={{fontFamily: "Caveat"}}>POPO, POstechian&apos;s POrtal</h1>
            <p style={{margin: '6px 0'}}>
              이곳에서 학생회관, 지곡회관 등의 장소를 예약하고, 총학생회에서 보유한 장비들을 대여할 수 있습니다! 📋 &nbsp;
              <Link href={"/reservation/place"} passHref>[장소 예약]</Link> &nbsp;
              <Link href={"/reservation/equipment"} passHref>[장비 예약]</Link>
            </p>
            <p style={{margin: '6px 0'}}>
              총학생회를 구성하는 자치단체에 대해 살펴볼 수 있습니다! 👀
              &nbsp;<Link href={"/association"} passHref>[총학생회]</Link>
            </p>
            <p style={{margin: '6px 0'}}>
              교내 동아리 역시 POPO에서 확인할 수 있습니다! 🎨
              &nbsp;<Link href={"/club"} passHref>[동아리]</Link>
            </p>
          </div>
          <div>
            <Image 
              rounded centered
              src={isDayTime ? 'index/home_background_day.jpg' : 'index/home_background_night.jpg'}
              alt={'background_image'}
              width={"100%"}
            />
          </div>
        </HomeCard>
        <NoticePanel noticeList={noticeList}/>
      </HomeLayout>
    </Layout>
  )
}

export default HomePage;

export const getServerSideProps: GetServerSideProps  = async (context) => {
  const res = await PoPoAxios.get<INotice>('notice/active');
  const noticeList = res.data;

  return {
    props: { noticeList }
  };
};

const HomeLayout = styled.div`
  display: flex;
  gap: 12px;
  @media only screen and (max-width: 780px) {
    flex-direction: column;
  }
`

const HomeCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  flex: 1;
  padding: 14px;
`
