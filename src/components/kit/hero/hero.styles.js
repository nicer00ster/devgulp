import styled from 'styled-components';

const StyledHero = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 0 0;
  text-align: center;
  min-height: 372px;
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
