import styled from "styled-components";
import {Menu} from "semantic-ui-react";

const NavbarMobile = () => {
    return (
        <NavbarWrapper>
            <div>
                POPO
            </div>
            <NavbarInner>

            </NavbarInner>
        </NavbarWrapper>
    )
}

export default NavbarMobile

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