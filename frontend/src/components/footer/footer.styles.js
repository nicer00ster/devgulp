import styled from 'styled-components';

const StyledFooterOuter = styled.div`
  padding: 0 0;
  width: 100%;
  left: 0;
  bottom: 0;
  top: 100%;
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
  width: 100%;
  list-style: none;
  padding: 0;
`;

const StyledFooterListItem = styled.li`
  padding: 0.4rem;
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
};
