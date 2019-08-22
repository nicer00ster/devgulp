import styled from 'styled-components';
import { animated } from 'react-spring';

const StyleSinglePost = styled.article`
  position: relative;
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
`;

const StyledSinglePostHeading = styled.h1`
  font-family: 'Trirong', serif;
  font-size: 40px;
`;

const StyledSinglePostUser = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSinglePostAuthorDate = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: none;
`;

const StyledSinglePostAuthor = styled.p`
  margin: 0;
  font-weight: 800;
  padding: 0.4rem;
  pointer-events: none;
`;

const StyledSinglePostDate = styled.time`
  color: ${props => props.theme.colors.lightBlack};
  padding: 0.4rem;
`;

const StyledSinglePostImage = styled.img`
  padding-top: 2rem;
  width: 100%;
`;

const StyledSinglePostContent = styled.div`
  font-family: 'Trirong', serif;
  font-size: 24px;
`;

const StyledSidebar = styled(animated.aside)`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 50%;
  top: calc(65px + 54px + 40px);
  z-index: 99;
  will-change: opacity;
  & button {
    margin: 0.4rem 0;
  }
`;

const StyledComments = styled.section``;

const StyledCommentContainer = styled.div`
  &.comment-reply {
    border-left: 6px solid ${props => props.theme.colors.grey};
    padding-left: 1.2rem;
    margin: 0.4rem;
  }
`;

const StyledCommentUserData = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCommentsHeading = styled.h2`
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledCommentReply = styled.form`
  display: flex;
  padding: 1.2rem;
  margin: 1.2rem 0;
`;

const StyledCommentReplyTo = styled.a`
  padding: 0.4rem;
`;

const StyledCommentReplyInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding-left: 1.2rem;
  outline: 0;
  border: 0;
  color: ${props => props.theme.colors.black};
  font-family: 'Trirong', serif;
  letter-spacing: 1px;
  resize: none;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
`;

const StyledCommentReplyToInput = styled(StyledCommentReplyInput)`
  font-size: 14px;
  border-radius: ${props => props.theme.effects.radius};
  background-color: rgba(0, 0, 0, 0.05);
`;

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadowHover};
  padding: 1.2rem;
  margin: 1.2rem;
`;

const StyledCommentAuthor = styled.p`
  color: ${props => props.theme.colors.black};
  margin: 0;
`;

const StyledCommentDate = styled.time`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledCommentAuthorDate = styled.div`
  padding-left: 0.6rem;
`;

const StyledCommentDateDivider = styled.span`
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  &:before {
    font-weight: bold;
    content: '\\00B7';
  }
`;

export {
  StyleSinglePost,
  StyledSinglePostHeading,
  StyledSinglePostUser,
  StyledSinglePostAuthor,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostImage,
  StyledSinglePostContent,
  StyledSidebar,
  StyledComments,
  StyledCommentContainer,
  StyledCommentUserData,
  StyledCommentsHeading,
  StyledCommentReply,
  StyledCommentReplyInput,
  StyledCommentReplyTo,
  StyledCommentReplyToInput,
  StyledComment,
  StyledCommentAuthor,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentAuthorDate,
};
