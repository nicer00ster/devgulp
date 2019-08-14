import styled from "styled-components";

const StyledFooterOuter = styled.div`
  padding: 0 0;
  width: 100%;
  margin: 0 auto;
  color: ${props => props.theme.colors.lightBlack};
  overflow: hidden;
`;

const StyledFooterInner = styled.div`
  padding: 0 2rem;
  width: 100%;
  margin: 0 auto;
`;

const StyledFooter = styled.footer`
  padding: 2rem 0 4rem;
  min-height: 400px;
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
