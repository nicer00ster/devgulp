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

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCommentAuthor = styled.p`
  color: ${props => props.theme.colors.black};
`;

const StyledCommentDate = styled.time`
  color: ${props => props.theme.colors.lightBlack};
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
  StyledComment,
  StyledCommentAuthor,
  StyledCommentDate,
};
