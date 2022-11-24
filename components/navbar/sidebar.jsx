import Link from 'next/link'
import { Menu, Segment, Sidebar } from 'semantic-ui-react'
import styled from 'styled-components'

const SideBar = ({ visible, toggleSidebar, pushContent }) => {

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        vertical
        animation="overlay"
        icon="labeled"
        width="thin"
        visible={visible}
        as={Menu}
        style={{ height: '100%', width: 172 }}
        onHide={toggleSidebar}
      >

        <Menu vertical style={{marginTop: '60px', border: 'none', width: '100%', fontSize: '16px'}} >
          <MenuItem>
            <Menu.Header>장소/장비 예약</Menu.Header>

            <Menu.Menu>
              <Link href={'/reservation/place'} passHref>
                <Menu.Item name='장소 예약'/>
              </Link>
              <Link href={'/reservation/equipment'} passHref>
                <Menu.Item name='장비 예약'/>
              </Link>
            </Menu.Menu>
          </MenuItem>

          <MenuItem>
            <Menu.Header>총학생회</Menu.Header>

            <Menu.Menu>
              <Link href={'/association'} passHref>
                <Menu.Item name='자치단체 소개'/>
              </Link>
              <Menu.Item disabled name='총학생회 게시판'/>
              <Menu.Item
                name='총학생회 기록물관리기관'
                target="_blank"
                href={'https://drive.google.com/drive/u/0/folders/1vHexwLSdD92maoKNlvw9zQ0q0J59k5FD'}
              />
            </Menu.Menu>
          </MenuItem>

          <MenuItem>
            <Menu.Header>동아리</Menu.Header>

            <Menu.Menu>
              <Link href={'/club'} passHref>
                <Menu.Item name='동아리 소개'/>
              </Link>
              <Menu.Item disabled name='동아리 게시판'/>
            </Menu.Menu>
          </MenuItem>

          <MenuItem>
            <Menu.Header>생활백서</Menu.Header>

            <Menu.Menu>
              <Link href={'/whitebook'} passHref>
                <Menu.Item name='생활백서'/>
              </Link>
              <Menu.Item
                name='생활관 자치회'
                target="_blank"
                href={'https://dorm.postech.ac.kr/'}
              />
              <Menu.Item
                name='인포스택'
                target="_blank"
                href={'http://inpostack.poapper.club/'}
              />
              <Menu.Item
                name='배달업체'
                target="_blank"
                href={'http://delivery.postech.ac.kr/'}
              />
            </Menu.Menu>
          </MenuItem>

        </Menu>
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        {pushContent}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SideBar

const MenuItem = styled(Menu.Item)`
  text-align: left !important;

  .item {
    text-align: left !important;
  }
  
  border-bottom: 1px solid lightgray;
  
  margin-bottom: 8px;
`