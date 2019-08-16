import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  position: relative;
  max-width: ${props => props.theme.breakpoints.desktop}px;
  // background-color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  margin: 0 auto;
`;

const StyledNav = styled.nav`
  display: flex;
  padding: 0 1rem;
`;

const StyledFilterNav = styled.div`
  opacity: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "0.4" : "1"};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "scale(0.95)" : ""};
  overflow: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "hidden" : "visible"};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? "none" : "all"};
  transition: all 0.25s linear;
`;

const StyledLogin = styled.button`
  display: block;
  position: relative;
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  line-height: normal;
  border: 0;
  cursor: pointer;
  transition: color 0.25s ease-in;
  color: ${props => props.theme.colors.lightBlack};
  &:hover {
    color: ${props => props.theme.colors.black};
  }
`;

const StyledSignup = styled.li`
  padding: 0 0.5rem;
  & a {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.lightBlack};
    color: ${props => props.theme.colors.lightBlack};
    transition: all 0.25s ease-in;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.black};
      border: 1px solid ${props => props.theme.colors.black};
    }
    &.active {
      background-color: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
    }
  }
`;

const StyledCategoryCount = styled.span`
  margin-left: 8px;
  display: inline-flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  color: white;
  background-color: ${props => props.theme.colors.black};
  transition: all 0.25s ease-in;
`;

const StyledFilterItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const StyledFilterItem = styled.button`
  color: ${props => props.theme.colors.lightBlack};
  padding: 0.4rem;
  margin: 0.4rem;
  cursor: pointer;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid ${props => props.theme.colors.lightBlack};
  transition: all 0.25s ease-in;
  outline: 0;
  &:hover,
  &:focus,
  &.active-filter {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.black};
  }
`;

const StyledLogo = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
`;

const StyledMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  list-style: none;
`;

const StyledMenuItem = styled.li`
  padding: 0 0.5rem;
  & a {
    padding: 0.5rem;
    border-radius: ${props => props.theme.effects.radius};
    transition: all 0.25s ease-in;
    outline: 0;
    &:hover,
    &:focus,
    &.active-route {
      background-color: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
      & span {
        background-color: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.black};
      }
    }
  }
`;

const StyledAvatar = styled.button`
  display: block;
  position: relative;
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  line-height: normal;
  border: 0;
  outline: 0;
  &:focus > img {
    outline: 1px dotted ${props => props.theme.colors.black};
    outline: -webkit-focus-ring-color auto 5px;
  }
  &:hover {
    cursor: pointer;
  }
  & img {
    width: ${props => (props.size ? `${props.size}px` : "32px")};
    height: ${props => (props.size ? `${props.size}px` : "32px")};
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
  }
`;

export {
  StyledHeader,
  StyledNav,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
  StyledCategoryCount,
  StyledLogin,
  StyledSignup,
  StyledLogo,
  StyledMenu,
  StyledMenuItem,
  StyledAvatar
};
