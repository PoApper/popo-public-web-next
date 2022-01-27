import styled from 'styled-components'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'
import Link from "next/link";

const NavbarDesktop = () => {
    return (
        <NavbarMenu borderless>
            <NavbarWrapper>
                <NavbarInner>
                    <Menu.Item>
                        <Link href={'/reservation'}>
                            <Dropdown item simple text={'장소/장비 예약'}>
                                <NavbarDropdownMenu>
                                    <Link href={'/reservation/place'}>
                                        <Dropdown.Item text={'장소 예약'}/>
                                    </Link>
                                    <Link href={'/reservation/equip'}>
                                        <Dropdown.Item text={'장비 예약'}/>
                                    </Link>
                                </NavbarDropdownMenu>
                            </Dropdown>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={'/association'}>
                            <Dropdown item simple text={'총학생회'}>
                                <NavbarDropdownMenu>
                                    <Link href={'association/introduce'}>
                                        <Dropdown.Item text={'자치단체 소개'}/>
                                    </Link>
                                    <Link href={'association/board'}>
                                        <Dropdown.Item as={'a'} text={'총학생회 게시판'}/>
                                    </Link>
                                    <Dropdown.Item text={'총학생회 기록물관리기관'} target={'_blank'}
                                                   href={'https://drive.google.com/drive/u/0/folders/1vHexwLSdD92maoKNlvw9zQ0q0J59k5FD'}/>
                                </NavbarDropdownMenu>
                            </Dropdown>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={'/club'}>
                            <Dropdown item simple text={'동아리'}>
                                <NavbarDropdownMenu>
                                    <Link href={'club/introduce'}>
                                        <Dropdown.Item text={'동아리 소개'}/>
                                    </Link>
                                    <Link href={'club/board'}>
                                        <Dropdown.Item as={'a'} text={'동아리 게시판'}/>
                                    </Link>
                                </NavbarDropdownMenu>
                            </Dropdown>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={'/white-book'}>
                            <Dropdown item simple text={'생활백서'}>
                                <NavbarDropdownMenu>
                                    <Dropdown.Item text={'생활관 자치회'}
                                                   href={'https://dorm.postech.ac.kr/'}
                                                   target="_blank"/>
                                    <Dropdown.Item text={'배달업체'}
                                                   href={'http://delivery.postech.ac.kr/'}
                                                   target="_blank"/>
                                </NavbarDropdownMenu>
                            </Dropdown>
                        </Link>
                    </Menu.Item>
                </NavbarInner>
            </NavbarWrapper>
        </NavbarMenu>
    )
}

export default NavbarDesktop

const NavbarWrapper = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  font-weight: bold;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
`

const NavbarInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  max-width: ${({theme}) => theme.contentWidth};
`

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
`

const NavbarDropdownMenu = styled(Dropdown.Menu)`
  border: none;
  boxShadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
`
