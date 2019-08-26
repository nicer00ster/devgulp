import styled from 'styled-components';

const StyledSingleUser = styled.div`
    line-height: 20px;
    font-size: 16px;
`;

const StyledSingleUserContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 640px;
`;

const StyledSingleUserContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledSingleUserInfo = styled.div`
  flex: 1 1 auto;
`;

const StyledSingleUserName = styled.h1`
  color: ${props => props.theme.colors.black};
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const StyledSingleUserDate = styled.div`
  color: ${props => props.theme.colors.lightBlack};
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  margin-bottom: 24px;
  font-size: 14px;
`;

const StyledSingleUserDescription = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.colors.black};
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 24px;
  font-family: 'Trirong', serif;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 1.2;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
    background-color: ${props => props.theme.colors.lightGreen};
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
  }
  & blockquote {
    padding: 0 2rem;
    z-index: 1;
  }
`;

const StyledSingleUserCompany = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  color: ${props => props.theme.colors.lightBlack};
  & i {
    padding-right: 4px;
  }
  & span {
    font-size: 12px;
  }
`;

const StyledSingleUserEmail = styled(StyledSingleUserCompany)``;

export {
  StyledSingleUser,
  StyledSingleUserContainer,
  StyledSingleUserInfo,
  StyledSingleUserContent,
  StyledSingleUserName,
  StyledSingleUserDate,
  StyledSingleUserDescription,
  StyledSingleUserCompany,
  StyledSingleUserEmail,
};
