import styled from 'styled-components';
import { animated } from 'react-spring';

const StyleSinglePost = styled.article``;

const StyledSinglePostContainer = styled.div`
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

const StyledSinglePostMeta = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
`;

const StyledSinglePostMetaMore = styled(StyledSinglePostMeta)`
  justify-content: space-between;
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
  ::placeholder {
    padding-left: 0.4rem;
  }
`;

const StyledLikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLikeCount = styled(animated.p)`
  margin: 1.2rem;
  padding-left: 1rem;
  letter-spacing: 2px;
  font-family: 'Trirong', sans-serif;
  position: relative;
  & span {
    left: 0;
  }
`;

const StyledMoreItems = styled.div``;

const StyledMoreItem = styled.button`
  position: relative;
  border: 0;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  padding: 1.2rem;
  color: ${props => props.theme.colors.lightBlack};
  font-size: 20px;
  bottom: 0;
  transition: all 0.15s ease-in;
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.black};
    bottom: 3px;
  }
`;

export {
  StyleSinglePost,
  StyledSinglePostContainer,
  StyledSinglePostHeading,
  StyledSinglePostMeta,
  StyledSinglePostMetaMore,
  StyledSinglePostAuthor,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostImage,
  StyledSinglePostContent,
  StyledSidebar,
  StyledComments,
  StyledCommentsHeading,
  StyledCommentReply,
  StyledCommentReplyInput,
  StyledCommentReplyTo,
  StyledLikeContainer,
  StyledLikeCount,
  StyledMoreItems,
  StyledMoreItem,
};
