import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledHeader = styled.header`
  width: 100%;
  position: sticky;
  max-width: ${props => props.theme.breakpoints.desktop}px;
  padding: 1rem 0;
  top: 0;
  margin: 0 auto;
  z-index: 101;
  transition: all 0.25s ease-in;
  &.is-scrolled {
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.effects.shadow};
    max-width: 100%;
    z-index: 99;
    & .filter-items {
      padding: 0;
    }
  }
`;

const StyledNav = styled.nav`
  display: flex;
  padding: 0 1rem;
`;

const StyledLogin = styled.button`
  display: block;
  position: relative;
  padding: 0.5rem;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  line-height: normal;
  border: 0;
  cursor: pointer;
  transition: color 0.25s ease-in;
  background-color: rgba(0, 0, 0, 0);
  color: ${props => props.theme.colors.lightBlack};
  &:hover {
    color: ${props => props.theme.colors.black};
  }
`;

const StyledSignup = styled.li`
  padding: 0.5rem;
  white-space: nowrap;
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

const StyledLogoContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
`;

const StyledLogo = styled(animated.a)`
  will-change: transform;
  padding: 0 0.5rem;
`;

const StyledMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 0 auto;
  list-style: none;
  ${props => props.theme.mediaQuery.phone`
    // flex: 1; 
  `};
`;

const StyledMenuItem = styled.li`
  position: relative;
  padding: 0.5rem;
  white-space: nowrap;
  i {
    font-size: 18px;
    padding: 0 0.5rem;
    color: ${props => props.theme.colors.lightBlack};
    cursor: pointer;
  }
  a {
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

const StyledAvatar = styled(animated.button)`
  display: block;
  position: relative;
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  line-height: normal;
  border: 0;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  &.no-touch {
    pointer-events: none;
  }
  &.bordered {
    img {
      border: 1px solid ${props => props.theme.colors.black};
      padding: 4px;
    }
  }
  &:focus > img {
    outline: 1px dotted ${props => props.theme.colors.black};
    outline: -webkit-focus-ring-color auto 5px;
  }
  &:hover {
    cursor: pointer;
  }
  & img {
    width: ${props => (props.size ? `${props.size}px` : '32px')};
    height: ${props => (props.size ? `${props.size}px` : '32px')};
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
  }
`;

const StyledSearch = styled.button`
  padding: 0 0.5rem;
  cursor: pointer;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  i {
    font-size: 18px;
  }
`;

const StyledSearchInput = styled(animated.li)`
  width: 0;
  padding-right: 0.8rem;
  opacity: 0;
  input {
    display: block;
    background: none;
    color: ${props => props.theme.colors.black};
    padding: 4px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightBlack};
    &:focus ~ .bar:before {
      width: 100%;
    }
  }
  .bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: ${props => props.theme.colors.black};
      transition: 300ms ease all;
      left: 0;
    }
  }
`;

export {
  StyledHeader,
  StyledNav,
  StyledCategoryCount,
  StyledLogin,
  StyledSignup,
  StyledLogoContainer,
  StyledLogo,
  StyledMenu,
  StyledMenuItem,
  StyledAvatar,
  StyledSearch,
  StyledSearchInput,
};
