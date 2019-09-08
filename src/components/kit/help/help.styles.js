import styled from 'styled-components';

const StyledHelp = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 50%;
  box-shadow: ${props => props.theme.effects.shadow};
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
  ${props => props.theme.mediaQuery.tablet`
    width: 100%;
    max-width: unset;
  `};
`;

const StyledHelpHeader = styled.div`
  position: relative;
  margin-bottom: 6px;
  height: 35px;
`;

const StyledHelpHeaderWrapper = styled.div`
  position: absolute;
  top: -38px;
  right: 0;
  left: 0;
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;

const StyledHelpHeaderCircle = styled.div`
  // border: 1px solid rgba(0,0,0,.2);
  width: 64px;
  height: 64px;
  border-radius: 100%;
  box-shadow: ${props => props.theme.effects.shadowHover};
  background-color: ${props => props.theme.colors.white};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 3px;
  left: 3px;
`;

const StyledHelpHeaderIcon = styled.i`
  position: relative;
  font-size: 36px;
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledHelpContent = styled.div`
  p {
    text-align: center;
    font-family: 'Trirong', serif;
    font-size: 24px;
    margin: 24px;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem;
    list-style: none;
    font-family: 'Trirong', serif;
    font-size: 18px;
    width: 100%;
    li {
      display: flex;
      width: 100%;
      margin: 1.2rem;
      background-color: ${props => props.theme.colors.lightGrey};
      border-top-right-radius: ${props => props.theme.effects.radius};
      border-bottom-right-radius: ${props => props.theme.effects.radius};
      &:before {
        content: '';
        padding: 0.8rem 0.8rem 0.8rem 12px;
        border-left: 6px solid ${props => props.theme.colors.grey};
      }
    }
  }
`;

export {
  StyledHelp,
  StyledHelpHeader,
  StyledHelpHeaderWrapper,
  StyledHelpHeaderCircle,
  StyledHelpHeaderIcon,
  StyledHelpContent,
};
