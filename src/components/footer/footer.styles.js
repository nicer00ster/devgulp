import styled from 'styled-components';

const StyledFooterOuter = styled.div`
  padding: 0 0;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  color: ${props => props.theme.colors.lightBlack};
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? '0.4'
      : '1'};
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
  padding: 0 2rem;
  width: 100%;
  margin: 0 auto;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
`;

const StyledFooterList = styled.ul`
  display: flex;
  justify-content: ${props => props.align};
  width: 100%;
  list-style: none;
  padding: 0;
`;

const StyledFooterListItem = styled.li`
  padding: 0.4rem;
`;

export {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem,
};
