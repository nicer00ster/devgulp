import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const StyledPosts = styled(animated.ul)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-gap: 12px;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  will-change: transform, opacity;
  &.no-results {
    grid-template-columns: repeat(1, 1fr);
  }
  ${props =>
    props.columns === 2 && !props.noResults
      ? css`
          grid-template-columns: repeat(2, 1fr);
        `
      : ``};
  ${props => props.theme.mediaQuery.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${props => props.theme.mediaQuery.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

const StyledPostsContainer = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadow};
  padding: 2rem;
`;

const StyledPost = styled.li`
  position: relative;
  box-shadow: ${props => props.theme.effects.shadow};
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
  width: 100%;
  height: 150px;
  z-index: 1;
  bottom: 0;
  cursor: pointer;
  transition: box-shadow 0.35s ease-in, bottom 0.25s ease;
  &.flatten {
    box-shadow: none;
    border: 1px solid ${props => props.theme.colors.grey};
  }
  &:hover,
  &:active {
    box-shadow: ${props => props.theme.effects.shadowHover};
    bottom: 3px;
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
  &.single-post {
    width: 100%;
    margin: 0 2rem;
    align-self: flex-end;
    justify-content: flex-end;
    & span {
      font-size: 28px;
      margin: 0 0.4rem;
    }
  }
`;

const StyledPostTaxonomyItem = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  & span {
    color: ${props => props.theme.colors.lightBlack};
    font-size: 24px;
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
  font-family: 'Trirong', serif;
  font-size: 14px;
  font-weight: 900;
`;

const StyledPostAuthor = styled.div`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledPostExcerpt = styled.div`
  color: ${props => props.theme.colors.lightBlack};
  font-style: italic;
  font-size: 12px;
  & p {
    margin: 0;
  }
`;

const StyledPostDateStamp = styled.time`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledPostImage = styled.div`
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: ${props => props.theme.effects.radius};
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  clip-path: polygon(50% 0, 100% 0, 100% 100%, 75% 100%);
  transition: all 0.35s ease;
  &:before {
    display: block;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    border-radius: ${props => props.theme.effects.radius};
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
  font-size: 12px;
`;

const StyledDateAuthorDivider = styled.span`
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  &:after {
    font-weight: bold;
    content: '\\00B7';
  }
`;

const StyledNoResults = styled.p`
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  padding: 1.2rem 0;
`;

const StyledFilterNav = styled.nav`
  opacity: ${props => (props.loginMenuOpen || props.userMenuOpen ? '0.4' : '1')};
  transform: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? 'scale(0.95)' : ''};
  overflow: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? 'hidden' : 'visible'};
  pointer-events: ${props =>
    props.loginMenuOpen || props.userMenuOpen ? 'none' : 'all'};
  padding: 0.4rem;
  margin: 0 auto;
  z-index: 1;
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-top-left-radius: ${props => props.theme.effects.radius};
  transition: all 0.25s linear;
`;

const StyledFilterItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 2rem 0;
  transition: all 0.25s ease-in;
`;

const StyledFilterItem = styled.button`
  color: ${props => props.theme.colors.lightBlack};
  padding: 0.4rem;
  margin: 0.4rem;
  cursor: pointer;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid ${props => props.theme.colors.lightBlack};
  background-color: ${props => props.theme.colors.white};
  transition: all 0.25s ease-in;
  outline: 0;
  &:hover,
  &:focus,
  &.active-filter {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.black};
  }
`;

const StyledPostCommentCount = styled.div`
  color: ${props => props.theme.colors.lightBlack};
  margin: 0.4rem 0;
  font-size: 12px;
  span {
    margin-left: 0.4rem;
  }
`;

export {
  StyledPosts,
  StyledPostsContainer,
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
  StyledPostCommentCount,
  StyledPostImage,
  StyledNoResults,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
};
