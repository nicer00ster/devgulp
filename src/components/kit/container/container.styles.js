import styled from 'styled-components';

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? '0.4'
      : '1'};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'scale(0.95)'
      : ''};
  overflow: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'hidden'
      : 'visible'};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'none'
      : 'all'};
  transition: all 0.25s linear;
  ${props =>
    props.isFetchingPosts || props.isSearching
      ? `
    pointer-events: none;
    opacity: 0.35;
  `
      : ''}
`;

export { StyledContainer };
