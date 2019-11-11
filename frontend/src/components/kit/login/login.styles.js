import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';

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
  top: 68px;
  right: 0;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.theme.effects.shadow};
  z-index: 1;
  min-width: 260px;
  padding: 0;
  background-color: ${props => props.theme.colors.white};
  transition: box-shadow 0.25s ease-in;
  &[disabled] {
    opacity: 0.5;
  }
  &[aria-busy='true']::before {
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }
  &:hover {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
`;

const StyledLoginForm = styled.form`
  opacity: 1;
  background-color: ${props => props.theme.colors.white};
  padding: 1.2rem;
  margin: 0;
  ${props => props.theme.mediaQuery.phone`
    margin: 0 auto;
    margin-top: auto;
    width: 100%;
    padding: 2.4rem;
  `};
`;

const StyledSegwayContainer = styled.div``;

const StyledSegwaySignup = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
`;

const StyledLoginCaret = styled.div`
  left: 214px;
  clip: rect(0px, 18px, 14px, -4px);
  top: -14px;
  position: absolute;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0);
  &:after {
    content: '';
    display: block;
    height: 14px;
    width: 14px;
    box-shadow: rgba(0, 0, 0, 0.54) -1px -1px 1px -1px;
    background-color: ${props => props.theme.colors.white};
    transform: rotate(45deg) translate(6px, 6px);
  }
  ${props => props.theme.mediaQuery.phone`
    
  `};
`;

export {
  StyledLogin,
  StyledLoginForm,
  StyledLoginCaret,
  StyledSegwayContainer,
  StyledSegwaySignup,
};
