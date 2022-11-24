import React, { ReactNode, useState } from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import NavbarDesktop from './navbar/navbar.desktop'
import Footer from './footer'
import { Desktop, Mobile } from './media-query'
import NavbarMobile from './navbar/navbar.mobile'
import SideBar from './navbar/sidebar'

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>POPO 퍼블릭 페이지</title>
        <meta name="description" content="POPO 퍼블릭 페이지"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      <main>
        <Mobile criteria={"768px"}>
          <NavbarMobile
            openSidebar={() => setSidebarVisible(true)}
          />
          <SideBar
            visible={sidebarVisible}
            toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
            pushContent={
              <Wrapper>
                <div style={{ width: '100%' }}>
                  {children}
                </div>
              </Wrapper>
            }
          />
        </Mobile>

        <Desktop criteria={"768px"}>
          <NavbarDesktop/>
          <Wrapper>
            <div style={{ width: '100%' }}>
              { children }
            </div>
          </Wrapper>
        </Desktop>

        <Footer/>
      </main>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.footerHeight});
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem;
  margin: auto;
`

export default Layout