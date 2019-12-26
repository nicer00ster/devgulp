import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';

const fadeOut = keyframes`
    0% {
      opacity: 1;
    }
    75% {
      background-color: palegreen;
    }
    99% {
      opacity: 0.01;
    }
    100% {
      opacity: 0;
      width: 0;
      height: 0;
    }
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(3px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-5px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(3px, 0, 0);
  }
`;

const StyledPublish = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadow};
  padding: 1.2rem;
  width: 50%;
  ${props => props.theme.mediaQuery.tablet`
    width: 90%;
  `};
`;

const StyledPublishContainer = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  opacity: ${props => (props.showEmojis ? 0.25 : 1)};
  transition: all 0.25s ease-in;
  pointer-events: ${props => (props.showEmojis ? 'none' : 'all')};
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const StyledPublishTitle = styled.input`
  font-size: 36px;
  outline: 0;
  border: 0;
  max-width: 100%;
  color: ${props => props.theme.colors.black};
  font-family: 'Trirong', serif;
  letter-spacing: 1px;
  background-color: rgba(0, 0, 0, 0);
  &.error {
    animation: ${shake} 0.5s linear;
  }
  &.error::placeholder {
    color: tomato;
  }
  ::placeholder {
    padding-left: 0.4rem;
  }
`;

const StyledPublishBody = styled.div`
  width: 100%;
  height: 400px;
  font-size: 24px;
  outline: 0;
  border: 0;
  color: ${props => props.theme.colors.black};
  font-family: 'Trirong', serif;
  letter-spacing: 1px;
  resize: none;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
  &.error {
    animation: ${shake} 0.5s linear;
  }
  &.error::placeholder {
    color: tomato;
  }
  :empty:before {
    padding-left: 0.4rem;
    content: attr(placeholder);
    color: ${props => props.theme.colors.lightBlack};
    display: block; /* For Firefox */
  }
  ::placeholder {
    padding-left: 0.4rem;
  }
`;

const StyledPublishCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.4rem;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 5px;
  margin: 2rem 0;
`;

const StyledPublishButton = styled.button`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.shadow};
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: none;
  outline: 0;
  border-radius: 50%;
  transition: all 0.075s ease-in;
  &:active {
    bottom: -3px;
    box-shadow: ${props => props.theme.effects.shadowHover};
    & i {
      font-size: 18px;
    }
  }
  &:focus {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
  &:disabled,
  &[aria-busy='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
  &.active {
    & div {
      width: 11px;
      height: 11px;
      animation: ${fadeOut} 0.5s linear;
    }
    & div:nth-of-type(1) {
      transform: translate(50px, 0);
    }
    & div:nth-of-type(2) {
      transform: translate(-50px, 0);
    }
    & div:nth-of-type(3) {
      transform: translate(0, 50px);
    }
    & div:nth-of-type(4) {
      transform: translate(0, -50px);
    }
    & div:nth-of-type(5) {
      transform: translate(35px, 35px);
    }
    & div:nth-of-type(6) {
      transform: translate(-35px, -35px);
    }
    & div:nth-of-type(7) {
      transform: translate(35px, -35px);
    }
    & div:nth-of-type(8) {
      transform: translate(-35px, 35px);
    }
  }
`;

const StyledPublishIcon = styled.i`
  color: ${props => props.theme.colors.green};
  pointer-events: none;
  font-size: 24px;
  transition: font-size 0.075s ease-in;
`;

const StyledPublishConfetti = styled.div`
  position: absolute;
  box-shadow: 0px 5px 18px 0px rgba(46, 61, 73, 0.3);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  background: ${props => props.color};
`;

const StyledPublishImageUploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:disabled,
  &[aria-busy='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const StyledPublishImageUpload = styled.input`
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
  & + label {
    display: inline-block;
    padding: 0.4rem;
    cursor: pointer;
    height: 30px;
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.effects.radius};
    border: 1px solid ${props => props.theme.colors.black};
    transition: all 0.15s ease-in;
    &:hover {
      background-color: ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.white};
    }
  }
  &:focus + label {
    outline: 1px dotted ${props => props.theme.colors.black};
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

const StyledPreviewImageButton = styled.button`
  display: inline-block;
  padding: 0.4rem;
  width: 150px;
  cursor: pointer;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid ${props => props.theme.colors.black};
  transition: all 0.15s ease-in;
  margin: 2rem 0;
  &:hover {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
  }
`;

const StyledPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 450px;
  min-height: 450px;
  object-fit: cover;
`;

const StyledPublishEmojis = styled(animated.fieldset)`
  position: absolute;
  width: 260px;
  z-index: 1;
  border: 0;
  padding: 0;
  margin: 0;
`;

const StyledEmojiPicker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0.4rem;
  margin: 0 0.4rem;
  filter: grayscale(1);
  &:hover {
    filter: unset;
  }
`;

export {
  StyledPublish,
  StyledPublishContainer,
  StyledPublishTitle,
  StyledPublishBody,
  StyledPublishButton,
  StyledPublishIcon,
  StyledPublishConfetti,
  StyledPublishCategories,
  StyledPublishImageUploadWrapper,
  StyledPublishImageUpload,
  StyledPreviewImageButton,
  StyledPreviewImage,
  StyledPublishEmojis,
  StyledEmojiPicker,
};
