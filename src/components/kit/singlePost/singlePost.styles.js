import styled from "styled-components";

const StyleSinglePost = styled.article`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
`;

const StyledSinglePostHeading = styled.h1`
  font-family: "Trirong", serif;
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
  font-family: "Trirong", serif;
  font-size: 24px;
`;

export {
  StyleSinglePost,
  StyledSinglePostHeading,
  StyledSinglePostUser,
  StyledSinglePostAuthor,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostImage,
  StyledSinglePostContent
};
