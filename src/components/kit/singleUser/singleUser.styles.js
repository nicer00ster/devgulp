import styled from 'styled-components';
import { StyledPublishImageUpload } from '../publish/publish.styles';

const StyledSingleUser = styled.div`
  line-height: 20px;
  font-size: 16px;
  margin: 4rem 0;
`;

const StyledSingleUserContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 768px;
`;

const StyledSingleUserContent = styled.div`
  display: flex;
  align-items: flex-start;
  ${props => props.theme.mediaQuery.phone`
    flex-direction: column-reverse;
    align-items: center;
  `};
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
  color: ${props => props.theme.colors.white};
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
    width: 75%;
    height: 50%;
    bottom: 0;
    pointer-events: none;
  }
  & blockquote {
    padding: 2rem;
    background-color: ${props => props.theme.colors.lightBlack};
  }
`;

const StyledSingleUserCompany = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.lightBlack};
  & i {
    padding-right: 8px;
  }
  & span {
    font-size: 12px;
  }
`;

const StyledSingleUserEmail = styled(StyledSingleUserCompany)``;

const StyledSingleUserFollowers = styled(StyledSingleUserCompany)``;

const StyledSingleUserAvatar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${props => (props.isUploadingAvatar ? '.4' : '1')};
  pointer-events: ${props => (props.isUploadingAvatar ? 'none' : 'all')};
  &:hover {
    .upload-avatar + label {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .upload-avatar + label {
    opacity: 0;
    margin: 1.2rem 0;
    transform: translateY(-20px);
  }
`;

const StyledSingleUserAvatarUpload = styled(StyledPublishImageUpload)`
  + label {
    font-size: 12px;
  }
`;

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
  StyledSingleUserFollowers,
  StyledSingleUserAvatar,
  StyledSingleUserAvatarUpload,
};
