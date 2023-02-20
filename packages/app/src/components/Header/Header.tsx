import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WalletConnectButton } from './ConnectButton';

import { ReactComponent as Burger } from './burger.svg';
import { Container } from '../Container';

export const HEADER_HEIGHT = '64px';

function NavMenuItems() {
  return (
    <>
      <HeaderTitleContainer>
        <h2>{`///`}</h2>
      </HeaderTitleContainer>
      <Nav>
        <Link to="/">Create a Stack</Link>
        <Link to="/orders">Your Stacks</Link>
      </Nav>
      <WalletConnectButtonContainer>
        <WalletConnectButton />
      </WalletConnectButtonContainer>
    </>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderFrame>
      <SidebarToggle onClick={() => setIsOpen(!isOpen)}>
        <Burger />
      </SidebarToggle>
      {isOpen && <SidebarToggleOverlay onClick={() => setIsOpen(false)} />}
      <Aside isOpen={isOpen}>
        <NavMenuItems />
      </Aside>
      <Container>
        <HeaderNav>
          <NavMenuItems />
        </HeaderNav>
      </Container>
    </HeaderFrame>
  );
}

const SidebarToggle = styled.button`
  display: block;
  background: #000;
  color: #fff;
  outline: none;
  border: 0;
  padding: 20px;
  font-weight: bold;
  text-transform: uppercase;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  width: ${HEADER_HEIGHT};
  height: ${HEADER_HEIGHT};
  @media (min-width: 480px) {
    display: none;
  }
`;

const SidebarToggleOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(6px);
  z-index: 1047;
  @media (min-width: 480px) {
    display: none;
  }
`;

const WalletConnectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Aside = styled.aside<{ isOpen: boolean }>(
  (props) => `
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  width: 280px;
  height: 100%;
  position: fixed;
  z-index: 1048;
  top: 0;
  left: 0;
  border-right: 2px solid #000;
  transform: translateX(${props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  @media (min-width: 480px) {
    display: none;
  }
`
);

const HeaderNav = styled.nav`
  display: none;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
  z-index: 1000;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (min-width: 480px) {
    display: flex;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`;

const HeaderFrame = styled.header`
  height: ${HEADER_HEIGHT};
  @media (min-width: 480px) {
    width: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: end;
  gap: 16px;
  width: 100%;

  @media (min-width: 480px) {
    flex-direction: row;
  }

  & > a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    display: block;
    border-radius: 0;
    border: 0;
  }

  & > a:hover {
    text-decoration: underline;
  }
`;
