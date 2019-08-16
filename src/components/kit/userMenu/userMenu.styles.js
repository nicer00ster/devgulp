import styled from "styled-components";
import { animated } from "react-spring";

const StyledUserMenu = styled(animated.fieldset)`
  position: absolute;
  will-change: opacity, transform;
  opacity: 0;
  top: 68px;
  right: 0px;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.theme.effects.shadow};
  z-index: 1;
  min-width: 260px;
  background-color: ${props => props.theme.colors.white};
  padding: 0;
  transition: box-shadow 0.25s ease-in;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
`;

const StyledUserMenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
`;

const StyledUserDataListItem = styled.li`
  display: flex;
  padding: 1.2rem;
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 0.6rem;
  pointer-events: none;
  & span {
    color: ${props => props.theme.colors.lightBlack};
    padding: 4px 0;
  }
`;

const StyledUserMenuListItem = styled.li`
  position: relative;
  padding: 1.2rem 2.4rem;
`;

const StyledUserMenuDivider = styled.div`
  border-top: solid 1px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 0;
  padding-top: 0;
  width: 100%;
`;

const StyledUserMenuCaret = styled.div`
  left: 232px;
  clip: rect(0px, 18px, 14px, -4px);
  top: -14px;
  position: absolute;
  pointer-events: none;
  &:after {
    background-color: ${props => props.theme.colors.white};
    content: "";
    display: block;
    box-shadow: rgba(0, 0, 0, 0.54) -1px -1px 1px -1px;
    transform: rotate(45deg) translate(6px, 6px);
    height: 14px;
    width: 14px;
  }
`;

const StyledLogoutButton = styled.button`
  border: 0;
  margin: 0;
  cursor: pointer;
  color: ${props => props.theme.colors.lightBlack};
  padding-left: 0;
  transition: color 0.15s ease-in;
  &:hover, &:focus {
    color: ${props => props.theme.colors.black};
  }
`;

export {
  StyledUserMenu,
  StyledUserMenuList,
  StyledUserMenuListItem,
  StyledUserDataListItem,
  StyledUserInfo,
  StyledUserMenuDivider,
  StyledUserMenuCaret,
  StyledLogoutButton,
};
