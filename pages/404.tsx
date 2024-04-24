import Head from 'next/head';
import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>POPO 퍼블릭 페이지</title>
        <meta name="description" content="POPO 퍼블릭 페이지" />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>
      <>
        <main>
          <Container textAlign={'center'} style={{ padding: '15vh 0' }}>
            <Link href={'/'} passHref>
              <Image centered src={'/popo.svg'} alt={'popo_logo'} />
            </Link>
            <h1>페이지가 존재하지 않습니다.</h1>
            <p>
              링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다. 🚫
              <br />
              POPO로{' '}
              <Link href={'/'} passHref>
                메인 페이지
              </Link>
              로 이동 🚀
            </p>
          </Container>
        </main>
      </>
    </>
  );
};

export default NotFoundPage;
