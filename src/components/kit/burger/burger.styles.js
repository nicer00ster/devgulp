import styled from "styled-components";

const StyledBurger = styled.a`
    pointer-events: bounding-box;
    position: relative;
    display: block;
    width: 36px;
    height: 36px;
    z-index: 99999;
    transition: transform 0.5s ease-in-out 0.125s;
    & div:nth-child(1) {
      top: ${props => props.drawerOpen ? '16px' : '10px'};
      width: 24px;
      transform: ${props => props.drawerOpen ? 'rotate(45deg)' : ''};
    }
    & div:nth-child(2) {
      top: 18px;
      width: 24px;
      opacity: ${props => props.drawerOpen ? '0' : '1'};
      transform: ${props => props.drawerOpen ? 'rotate(90deg)' : ''};
    }
    & div:nth-child(3) {
      top: ${props => props.drawerOpen ? '16px' : '26px'};
      transform: ${props => props.drawerOpen ? 'rotate(-45deg)' : ''};
      width: ${props => props.drawerOpen ? '24px' : '8px'};
    }
    & div {
      position: absolute;
      left: 6px;
      width: 8px;
      height: 2px;
      background: ${props => props.drawerOpen ? props.theme.colors.lightBlack : props.theme.colors.black};
      transition: width 0.125s ease-in-out, background 0.25s linear, top 0.25s ease-in-out 0.5s, transform 0.25s ease-out 0.25s, opacity 0.125s linear 0.5s;
    }
    &:hover {
      & div:nth-child(3) {
        width: 24px;
      }
    }
`;

export {
    StyledBurger,
}
