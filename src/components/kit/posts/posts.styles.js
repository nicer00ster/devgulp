import styled from "styled-components";
import { animated } from 'react-spring';

const StyledPosts = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: stretch;
  grid-gap: 12px;
  width: 100%;
  list-style: none;
  padding: 0;
  ${props => props.theme.mediaQuery.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

const StyledPost = styled(animated.li)`
  position: relative;
  box-shadow: ${props => props.theme.effects.shadow};
  border-radius: ${props => props.theme.effects.radius};
  transition: all 0.35s ease;
  cursor: pointer;
  height: 150px;
  bottom: 0;
  &:hover,
  &:active {
    box-shadow: ${props => props.theme.effects.shadowHover};
    bottom: 4px;
    & .post-image {
      clip-path: polygon(25% 0, 100% 0, 100% 100%, 50% 100%);
      &:before {
        clip-path: polygon(25% 0, 100% 0, 100% 100%, 50% 100%);
        opacity: 0.6;
      }
    }
  }
  & a {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &:focus {
      & .post-image {
        clip-path: polygon(25% 0, 100% 0, 100% 100%, 50% 100%);
        &:before {
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 50% 100%);
          opacity: 0.6;
        }
      }
    }
  }
`;

const StyledPostTaxonomies = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  padding: 0;
  margin: 1rem 0 0 1rem;
`;

const StyledPostTaxonomyItem = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  & span {
    color: ${props => props.theme.colors.lightBlack};
    padding-right: 0.6rem;
  }
`;

const StyledPostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  width: 50%;
  margin: 1rem;
  ${props => props.theme.mediaQuery.phone`
    width: auto;
  `};
`;

const StyledPostTitle = styled.div`
  font-weight: bold;
`;

const StyledPostAuthor = styled.div`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledPostExcerpt = styled.div`
  color: ${props => props.theme.colors.lightBlack};
  font-style: italic;
  & p {
    margin: 0.5rem 0;
  }
`;

const StyledPostDateStamp = styled.time`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledPostImage = styled.div`
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-bottom-right-radius: ${props => props.theme.effects.radius};
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 75% 100%);
  transition: all 0.35s ease;
  &:before {
    display: block;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    background: linear-gradient(
        45deg,
        hsla(214, 11%, 37%, 1) 0%,
        hsla(214, 11%, 37%, 0) 70%
      ),
      linear-gradient(
        135deg,
        hsla(204, 25%, 67%, 1) 10%,
        hsla(204, 25%, 67%, 0) 80%
      ),
      linear-gradient(
        225deg,
        hsla(183, 53%, 86%, 1) 10%,
        hsla(183, 53%, 86%, 0) 80%
      ),
      linear-gradient(
        315deg,
        hsla(184, 78%, 93%, 1) 100%,
        hsla(184, 78%, 93%, 0) 70%
      );
    opacity: 0.8;
    z-index: 1;
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 75% 100%);
    transition: all 0.35s ease;
  }
`;

const StyledDateAuthor = styled.div`
  display: inline-flex;
`;

const StyledDateAuthorDivider = styled.span`
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  &:after {
    font-weight: bold;
    content: "\\00B7";
  }
`;

const StyledNoResults = styled.p`
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
`;

export {
  StyledPosts,
  StyledPost,
  StyledPostContent,
  StyledPostTaxonomies,
  StyledPostTaxonomyItem,
  StyledPostTitle,
  StyledPostAuthor,
  StyledPostDateStamp,
  StyledDateAuthor,
  StyledDateAuthorDivider,
  StyledPostExcerpt,
  StyledPostImage,
  StyledNoResults
};
