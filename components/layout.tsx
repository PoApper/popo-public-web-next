import React, { ReactNode } from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { useRouter } from 'next/router'
import NavbarDesktop from './navbar/navbar.desktop'
import Footer from './footer'

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>POPO 퍼블릭 페이지</title>
        <meta name="description" content="POPO 퍼블릭 페이지"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      <>
        <main>
          <NavbarDesktop/>
          <Wrapper>
            <div style={{ width: '100%' }}>
              {children}
            </div>
          </Wrapper>
          <Footer/>
        </main>
      </>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.footerHeight});
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout