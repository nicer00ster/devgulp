import styled from 'styled-components';

const StyledDrawer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 65%;
  height: 100%;
  z-index: 999;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.shadow};
  right: 0;
  bottom: 0;
  transition: transform 0.45s ease-in-out;
  transform: ${props =>
    props.drawerOpen ? 'translateX(0px)' : 'translateX(1200px)'};
  &:before {
    content: '';
    background-color: ${props => props.theme.colors.yellow};
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% calc(25% - 16vw), 0% 25%);
  }
  ul, div {
    opacity: ${props =>
        props.isLoggingOut || props.isLoggingIn ? '0.4' : '1'};
  }
`;

const StyledDrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 50%;
  padding: 2.4rem;
`;

const StyledDrawerItem = styled.li`
  list-style: none;
  font-size: calc(2em + 4vw);
  font-family: 'Trirong', serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  line-height: 2em;
  & a {
    position: relative;
    color: ${props => props.theme.colors.lightBlack};
    background-color: unset !important;
    outline: 0;
    &:hover, &:focus {
      color: ${props => props.theme.colors.black};
    }
    &:after {
      content: '';
      display: block;
      background: ${props => props.theme.colors.black};
      height: 0;
      position: absolute;
      left: -8px;
      right: -12px;
      bottom: -1px;
      opacity: 0.1;
      transition: height 0.25s ease, opacity 0.25s ease;
    }
    &:hover:after, &:focus:after {
      height: 35%;
      opacity: 0.15;
    }
    &.active-route {
      color: unset !important;
      &:after {
        height: 50%;
        opacity: 0.15;
      }
    }
  }
`;

const StyledDrawerUser = styled.div`
  width: 100%;
  padding: 1.2rem;
`;

export { StyledDrawer, StyledDrawerList, StyledDrawerItem, StyledDrawerUser };
