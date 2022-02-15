import styled from 'styled-components'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import MenuItemUser from './menu.item.user'

const NavbarDesktop = () => {
  return (
    <>
      <NavbarNav>
        <NavbarDiv>
          <NavbarMenu borderless>

            <Link href={'/'} passHref>
              <Menu.Item style={{ paddingLeft: 0 }}>
              <span style={{ textAlign: 'center' }}>
                <Image
                  centered
                  src={'/popo.svg'} alt={'logo'}
                  size={'small'}/>
                <PopoFullText>
                    Postechian&apos;s Portal
                </PopoFullText>
              </span>
              </Menu.Item>
            </Link>

            <Dropdown item simple text="장소/장비 예약">
              <Dropdown.Menu>
                <Link href={'/reservation/place'} passHref>
                  <Dropdown.Item as="a" text={'장소 예약'}/>
                </Link>
                <Link href={'/reservation/equipment'} passHref>
                  <Dropdown.Item as="a" text={'장비 예약'}/>
                </Link>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item simple text="총학생회">
              <Dropdown.Menu>
                <Link href={'/association'} passHref>
                  <Dropdown.Item as="a" text={'자치단체 소개'}/>
                </Link>
                <Dropdown.Item disabled as="a" text={'총학생회 게시판'}/>
                <Dropdown.Item text={'총학생회 기록물관리기관'} target="_blank"
                               href={'https://drive.google.com/drive/u/0/folders/1vHexwLSdD92maoKNlvw9zQ0q0J59k5FD'}/>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item simple text="동아리">
              <Dropdown.Menu>
                <Link href={'/club'} passHref>
                  <Dropdown.Item as="a" text={'동아리 소개'}/>
                </Link>
                <Dropdown.Item disabled as="a" text={'동아리 게시판'}/>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item simple text="생활백서">
              <Dropdown.Menu>
                <Link href={'/whitebook'} passHref>
                  <Dropdown.Item as="a" text={'생활백서'}/>
                </Link>
                <Dropdown.Item
                  text={'생활관 자치회'}
                  href={'https://dorm.postech.ac.kr/'} target={'_blank'}/>
                <Dropdown.Item
                  text={'배달업체'}
                  href={'http://delivery.postech.ac.kr/'} target={'_blank'}/>
              </Dropdown.Menu>
            </Dropdown>

            <MenuItemUser/>

          </NavbarMenu>
        </NavbarDiv>
      </NavbarNav>
    </>
  )
}

export default NavbarDesktop

const NavbarNav = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`

const NavbarDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({
    theme,
  }) => theme.contentWidth
  };
`

const NavbarMenu = styled(Menu)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  gap: 1rem;

  box-shadow: none !important;
  border: none !important;
  width: 100%;
`

const PopoFullText = styled.h1`
  text-align: center;
  margin-top: -0.4em;
  font-family: 'Caveat', serif;
  font-size: medium;
`