import styled from 'styled-components';

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 400px;
  opacity: ${props =>
    props.loginMenuOpen ||
    props.userMenuOpen ||
    props.drawerOpen ||
    props.isFetchingPosts ||
    props.isSearching ||
    props.isUpdatingUser
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
    props.loginMenuOpen ||
    props.userMenuOpen ||
    props.drawerOpen ||
    props.isFetchingPosts ||
    props.isSearching
      ? 'none'
      : 'all'};
  transition: all 0.25s linear;
`;

export { StyledContainer };
