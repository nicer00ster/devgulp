import styled, { keyframes } from 'styled-components';

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

const StyledLikeButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: none;
  outline: 0;
  border-radius: 50%;
  box-shadow: ${props => props.theme.effects.shadow};
  top: 0;
  transition: all 0.075s ease-in;
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

const StyledLikeIcon = styled.i`
  color: ${props => props.theme.colors.red};
  pointer-events: none;
  font-size: 24px;
  transition: font-size 0.075s ease-in;
`;

const StyledLikeConfetti = styled.div`
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

export { StyledLikeButton, StyledLikeIcon, StyledLikeConfetti };
