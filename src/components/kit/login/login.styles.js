import styled, { keyframes } from "styled-components";
import { animated } from "react-spring";

const loading = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const StyledLogin = styled(animated.fieldset)`
  position: absolute;
  will-change: opacity, transform;
  opacity: 0;
  top: 62px;
  right: 0px;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.theme.effects.shadow};
  z-index: 1;
  min-width: 260px;
  background-color: ${props => props.theme.colors.white};
  &[disabled] {
    opacity: 0.5;
  }
  &[aria-busy="true"]::before {
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }
`;

const StyledLoginForm = styled.form`
  opacity: 1;
  background-color: ${props => props.theme.colors.white};
`;

const StyledLoginCaret = styled.div`
  left: 232px;
  clip: rect(0px, 18px, 14px, -4px);
  top: -14px;
  position: absolute;
  pointer-events: none;
  background-color: ${props => props.theme.colors.white};
  &:after {
    content: "";
    display: block;
    box-shadow: rgba(0, 0, 0, 0.54) -1px -1px 1px -1px;
    transform: rotate(45deg) translate(6px, 6px);
    height: 14px;
    width: 14px;
  }
`;

export { StyledLogin, StyledLoginForm, StyledLoginCaret };
