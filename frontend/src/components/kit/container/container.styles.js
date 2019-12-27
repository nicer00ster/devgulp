import styled from 'styled-components';

const StyledContainerWrapper = styled.section`
  background-color: ${props => props.theme.colors.white};
  position: relative;
  margin: 8rem 0;
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'scale(0.95)'
      : 'scale(1)'};
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  transition: opacity 0.25s linear;
`;

export { StyledContainer, StyledContainerWrapper };
