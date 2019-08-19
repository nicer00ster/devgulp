import styled from "styled-components";

const StyledFooterOuter = styled.div`
  padding: 0 0;
  width: 100%;
  margin: 0 auto;
  color: ${props => props.theme.colors.lightBlack};
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

const StyledFooterInner = styled.div`
  padding: 0 2rem;
  width: 100%;
  margin: 0 auto;
`;

const StyledFooter = styled.footer`
  padding: 2rem 0 4rem;
  min-height: 2000px;
`;

const StyledFooterList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`;

const StyledFooterListItem = styled.li`
  padding: 0.4rem;
`;

export {
  StyledFooterOuter,
  StyledFooterInner,
  StyledFooter,
  StyledFooterList,
  StyledFooterListItem
};
