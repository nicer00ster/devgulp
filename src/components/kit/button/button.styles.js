import styled, {keyframes} from 'styled-components';

const ripple = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
`;

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 0.6rem 1.2rem;
  margin: 0;
  vertical-align: middle;
  overflow: visible;
  text-align: center;
  background: transparent;
  user-select: none;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.lightBlack};
  border: 1px solid ${props => props.theme.colors.lightBlack};
  border-radius: ${props => props.theme.effects.radius};
  transition: all 0.25s ease-in;
  &:hover,
  &:focus {
    outline: 0;
    text-decoration: none;
    background-color: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
  }
  &:not(:disabled) {
    cursor: pointer;
  }
`;

const StyledRipple = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  &.active {
    & span {
      animation: ${ripple} 0.4s ease-in;
    }
  }
`;

const StyledRippleCircle = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
`;

export {StyledButton, StyledRipple, StyledRippleCircle};
