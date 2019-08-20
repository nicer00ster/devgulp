import styled from 'styled-components';

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "0.4" : "1"};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "scale(0.95)" : ""};
  overflow: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "hidden" : "visible"};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "none" : "all"};
  transition: all 0.25s linear;
  ${props => props.isFetchingPosts || props.isSearching ? `
    pointer-events: none;
    opacity: 0.35;
  `: ''}
`;

export {
    StyledContainer,
};
