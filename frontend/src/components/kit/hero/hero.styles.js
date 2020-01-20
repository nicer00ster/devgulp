import styled from 'styled-components';

const StyledHero = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
  padding: 0 0;
  margin-top: 8rem;
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen ? '0.4' : '1'};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'scale(0.95)'
      : ''};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen || props.drawerOpen
      ? 'none'
      : 'all'};
  transition: all 0.25s linear;
  ${props => props.theme.mediaQuery.tablet`
    flex-direction: column;
  `};
`;

const StyledHeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

export { StyledHero, StyledHeroOverlay };
