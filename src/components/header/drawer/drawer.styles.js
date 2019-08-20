import styled from "styled-components";

const StyledDrawer = styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;
    height: 100%;
    background-color: ${props => props.theme.colors.white};
    z-index: 999;
    box-shadow: ${props => props.theme.effects.shadow};
    position: fixed;
    right: 0;
    bottom: 0;
    transition: transform .45s ease-in-out;
    transform: ${props => props.drawerOpen ? 'translateX(0px)' : 'translateX(1200px)'};
    &:before {
      content: "";
      background-color: ${props => props.theme.colors.white};
      position: absolute;
      height: 100%;
      width: 100%;
      clip-path: polygon(0 0, 100% 0, 100% calc(25% - 16vw), 0% 25%);
    }
`;

const StyledDrawerList = styled.ul`
    display: flex;
    flex-direction: column;
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
      &:hover {
        color: ${props => props.theme.colors.black};
      }
      &:after {
        content: "";
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
      &:hover:after {
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

export {
    StyledDrawer,
    StyledDrawerList,
    StyledDrawerItem,
    StyledDrawerUser,
};
