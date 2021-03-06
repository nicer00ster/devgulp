import styled from 'styled-components';

const StyledFooterOuter = styled.div`
  position: absolute;
  padding: 0 0;
  width: 100%;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  color: ${props => props.theme.colors.lightBlack};
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.grey};
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen ? '0.4' : '1'};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'scale(0.95)'
      : 'scale(1)'};
  overflow: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'hidden'
      : 'visible'};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'none'
      : 'all'};
  transition: all 0.25s linear;
`;

const StyledFooterInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1080px;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0 1.2rem;
`;

const StyledFooterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.align};
  align-items: center;
  width: 100%;
  list-style: none;
  padding: 0;
`;

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 75px;
    padding: 0.4rem;
    transition: width 0.25s ease-in-out;
  }
`;

const StyledFooterListItem = styled.li`
  padding: 0.4rem;
  a.disabled {
    color: #b4b4b4;
    pointer-events: none;
  }
`;

const StyledFooterLogo = styled.div`
  display: flex;
  align-items: center;
`;

export {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem,
  StyledFooterLogo,
  StyledLogo,
};
