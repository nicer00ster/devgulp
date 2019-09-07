import styled from 'styled-components';
import { animated } from 'react-spring';

const StyleSinglePost = styled.article`
  position: relative;
`;

const StyledSinglePostContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadow};
  padding: 1.2rem;
`;

const StyledSinglePostHeading = styled.h1`
  font-family: 'Trirong', serif;
  font-size: 40px;
  margin: 1.2rem 0.4rem;
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

const StyledSinglePostAuthor = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 0.4rem;
  pointer-events: none;
  span {
    font-family: 'Trirong', serif;
    font-size: 18px;
    letter-spacing: 1px;
    margin-left: 0.4rem;
  }
`;

const StyledSinglePostDate = styled.time`
  color: ${props => props.theme.colors.lightBlack};
  padding: 0.4rem;
`;

const StyledDateViewsDivider = styled.span`
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  &:after {
    font-weight: bold;
    content: '\\00B7';
  }
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
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  z-index: 99;
  will-change: opacity, transform;
  &.hide {
    display: none;
  }
  & button {
    margin: 0.4rem 0;
  }
`;

const StyledComments = styled.section`
  display: flex;
  flex-direction: column;
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

const StyledMoreItems = styled.div`
  position: relative;
`;

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
  &.active {
    opacity: 0.5;
  }
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
  StyledDateViewsDivider,
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
