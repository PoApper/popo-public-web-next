import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Dropdown,
    Header,
    Image,
    Menu,
    Visibility,
} from 'semantic-ui-react'
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive'
import axios from 'axios'
import styled from 'styled-components'

export default class Navbar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuFixed: false,
        }
    }

    async componentDidMount () {
        try {
            const verifiedUser = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/verifyToken`,
                { withCredentials: true })
            this.setState({
                userInfo: verifiedUser.data, // { "id": ..., "name": ... }
            })
        } catch (err) {
            // console.clear();
        }
    }

    handleLogout = async () => {
        try {
            console.log('before')
            await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`,
                { withCredentials: true })
            console.log('after')
            alert('로그아웃 되었습니다. 😎')
        } catch (err) {
            alert('로그아웃에 실패했습니다. 😢')
        }
    }

    stickTopMenu = () => this.setState({ menuFixed: true })
    unStickTopMenu = () => this.setState({ menuFixed: false })

    render () {
        const { menuFixed } = this.state

        return (
            <nav>
                <Visibility once={false}
                            onBottomPassed={this.stickTopMenu}
                            onBottomVisible={this.unStickTopMenu}>
                    <Menu borderless fixed="top"
                          style={menuFixed ? fixedMenuStyle : menuStyle}>
                        <MenuWrapper>
                            <Menu.Item position={'left'}>
                                <Link to={'/'}>
                                    <Image centered src="/popo.svg" size={'small'}/>
                                    <Header as="h1"
                                            style={{
                                                fontFamily: 'Caveat',
                                                textAlign: 'center',
                                                marginTop: '-0.4em',
                                                fontSize: 'medium',
                                            }}>
                                        Postechian's Portal
                                    </Header>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                                    <NavBarDeskTop userInfo={this.state.userInfo}/>
                                </Responsive>
                                <Responsive maxWidth={Responsive.onlyComputer.minWidth}>
                                    <NavbarMobile/>
                                </Responsive>
                            </Menu.Item>
                            {
                                this.state.userInfo ?
                                    <Menu.Item position={'right'}>
                                        <Dropdown item simple
                                                  text={`${this.state.userInfo.name}(${this.state.userInfo.id})`}>
                                            <Dropdown.Menu style={{
                                                border: 'none',
                                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                                            }}>
                                                <Dropdown.Item text={'내 정보'} href={'/myInfo'}/>
                                                <Dropdown.Item text={'내 예약'} href={'/myReservation'}/>
                                                <Dropdown.Item text={'로그아웃'} onClick={this.handleLogout}
                                                               href={'/'}/>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Item> :
                                    <Menu.Item position={'right'}>
                                        <Button style={{ border: 'none', background: 'none' }}
                                                href={'/login'}>로그인</Button>
                                    </Menu.Item>
                            }
                            <Menu.Item>
                                <Link to={'/association'}>
                                    <Dropdown item simple
                                              icon="globe" direction="left">
                                        <Dropdown.Menu style={{
                                            border: 'none',
                                            boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                                        }}>
                                            <Dropdown.Item text={'한국어'}/>
                                            <Dropdown.Item text={'English'}/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Link>
                            </Menu.Item>
                        </MenuWrapper>
                    </Menu>
                </Visibility>
            </nav>
        )
    }
}

class NavbarMobile extends Component {
    render () {
        return (
            <div>
                <Dropdown simple icon={'sidebar'} direction={'left'}>
                    <Dropdown.Menu style={{
                        border: 'none',
                        boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                    }}>
                        <Dropdown item simple text="장소/장비 예약" href={'/reservation'}
                                  icon={null}>
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/reservation/place'}><Dropdown.Item as="a"
                                                                               text={'장소 예약'}/></Link>
                                <Link to={'/reservation/equip'}><Dropdown.Item as="a"
                                                                               text={'장비 예약'}/></Link>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item simple text="총학생회" href={'/association'} icon={null}>
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/association/introduce'}><Dropdown.Item as="a"
                                                                                   text={'자치단체 소개'}/></Link>
                                <Link to={'/association/board'}><Dropdown.Item as="a"
                                                                               text={'총학생회 게시판'}/></Link>
                                <Dropdown.Item text={'총학생회 기록물관리기관'} target="_blank"
                                               href={'https://drive.google.com/drive/u/0/folders/1vHexwLSdD92maoKNlvw9zQ0q0J59k5FD'}/>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item simple text="동아리" href={'/club'} icon={null}>
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/club/introduce'}><Dropdown.Item as="a"
                                                                            text={'동아리 소개'}/></Link>
                                <Link to={'/club/board'}><Dropdown.Item as="a"
                                                                        text={'동아리 게시판'}/></Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

class NavBarDeskTop extends Component {
    render () {
        return (
            <div className={'item'} style={{ padding: 0 }}>
                <Menu.Item>
                    <Link to={'/reservation'}>
                        <Dropdown item simple text="장소/장비 예약">
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/reservation/place'}><Dropdown.Item as="a"
                                                                               text={'장소 예약'}/></Link>
                                <Link to={'/reservation/equip'}><Dropdown.Item as="a"
                                                                               text={'장비 예약'}/></Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/association'}>
                        <Dropdown item simple text="총학생회">
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/association/introduce'}><Dropdown.Item as="a"
                                                                                   text={'자치단체 소개'}/></Link>
                                <Link to={'/association/board'}><Dropdown.Item as="a"
                                                                               text={'총학생회 게시판'}/></Link>
                                <Dropdown.Item text={'총학생회 기록물관리기관'} target="_blank"
                                               href={'https://drive.google.com/drive/u/0/folders/1vHexwLSdD92maoKNlvw9zQ0q0J59k5FD'}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/club'}>
                        <Dropdown item simple text="동아리">
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Link to={'/club/introduce'}><Dropdown.Item as="a"
                                                                            text={'동아리 소개'}/></Link>
                                <Link to={'/club/board'}><Dropdown.Item as="a"
                                                                        text={'동아리 게시판'}/></Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/white-book'}>
                        <Dropdown item simple text="생활백서">
                            <Dropdown.Menu style={{
                                border: 'none',
                                boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                            }}>
                                <Dropdown.Item text={'생활관 자치회'}
                                               href={'https://dorm.postech.ac.kr/'}
                                               target="_blank"/>
                                <Dropdown.Item text={'배달업체'}
                                               href={'http://delivery.postech.ac.kr/'}
                                               target="_blank"/>
                                {
                                    this.props.userInfo ?
                                        <Dropdown.Item text={'Apple On Campus'}
                                                       href={'https://www.apple.com/kr_edu_5003952/shop/back-to-school'}
                                                       target="_blank"/> : null
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Link>
                </Menu.Item>
            </div>
        )
    }
}

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 0.4vw 1vh rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    background: 'rgba(255, 255, 255, 0.5)',
}

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  width: ${({ theme }) => theme.contentWidth};
`