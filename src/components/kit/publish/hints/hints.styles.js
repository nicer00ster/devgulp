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

const StyledHints = styled(animated.div)`
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadowHover};
  z-index: 1;
  right: 0;
  top: 0;
`;

const StyledHintItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  list-style: none;
  opacity: ${props => (props.active ? 1 : 0)};
  font-family: 'Trirong', serif;
  font-size: 18px;
  transition: opacity 0.25s ease-in;
`;

const StyledHintItem = styled.li`
  display: flex;
  padding: 1.2rem;
  line-height: 24px;
  &:before {
    content: '';
    border-left: 6px solid ${props => props.theme.colors.grey};
  }
  span {
    display: inline-flex;
    align-items: center;
  }
  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    background-color: ${props => props.theme.colors.lightGrey};
  }
`;

const StyledHintContent = styled.div`
  background-color: ${props => props.theme.colors.lightGrey};
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-bottom-right-radius: ${props => props.theme.effects.radius};
  padding: 0.4rem 0.4rem 0.4rem 12px;
`;

const StyledHintButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: none;
  outline: 0;
  border-radius: 50%;
  box-shadow: ${props => props.theme.effects.shadow};
  transform: translate(20px, -20px);
  transition: all 0.075s ease-in;
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
  &:active {
    top: 3px;
    box-shadow: ${props => props.theme.effects.shadowHover};
    & i {
      font-size: 18px;
    }
  }
  &:focus {
    box-shadow: ${props => props.theme.effects.shadowHover};
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

const StyledHintIcon = styled.i`
  color: ${props => props.theme.colors.lightBlack};
  pointer-events: none;
  font-size: 24px;
  transition: font-size 0.075s ease-in;
`;

const StyledHintConfetti = styled.div`
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

export {
  StyledHints,
  StyledHintItems,
  StyledHintItem,
  StyledHintContent,
  StyledHintButton,
  StyledHintIcon,
  StyledHintConfetti,
};
