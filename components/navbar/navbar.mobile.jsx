import { Icon, Image, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import MenuItemUser from './menu.item.user';

const NavbarMobile = ({ openSidebar }) => {
  return (
    <NavbarWrapper>
      <NavbarInner>
        <NavbarMenu borderless>
          <Menu.Item style={{ margin: 10 }} onClick={openSidebar}>
            <Icon name={'sidebar'} style={{ margin: '0' }} />
          </Menu.Item>

          <Menu.Item position={'left'} style={{ paddingLeft: 0 }}>
            <Link href={'/'} passHref>
              <Image
                src={'/popo.svg'}
                alt={'logo'}
                size={'tiny'}
                style={{ margin: 'rgba(255, 255, 255, 0.7)' }}
              />
            </Link>
          </Menu.Item>

          <MenuItemUser />
        </NavbarMenu>
      </NavbarInner>
    </NavbarWrapper>
  );
};

export default NavbarMobile;

const NavbarWrapper = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`;

const NavbarInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`;

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
`;
