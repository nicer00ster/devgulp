import styled, { keyframes } from 'styled-components';

const particleAnimation = keyframes`
    from {
        left: -100px;
    }
    to {
        left: calc( 100% + 100px );
    }
`;

const StyledHero = styled.div`
  position: relative;
  padding: 8rem 0;
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

const StyledHeroSwift = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  width: 1px;
  height: 1px;
  background-color: ${props => props.theme.colors.black};
  animation-name: ${particleAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  &:before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    right: 1px;
    top: 0px;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 0.4) 100%
    );
  }
`;

export { StyledHero, StyledHeroSwift };
