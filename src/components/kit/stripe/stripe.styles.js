import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledStripe = styled.div``;

const StyledStripeAmounts = styled(animated.fieldset)`
  position: absolute;
  opacity: 0;
  top: 32px;
  right: 0;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.theme.effects.shadow};
  z-index: 1;
  min-width: 130px;
  padding: 0;
  background-color: ${props => props.theme.colors.white};
  will-change: opacity, transform;
  transition: box-shadow 0.25s ease-in;
  div {
    display: flex;
    flex-direction: column;
  }
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
`;

const StyledStripeAmount = styled.a`
  margin: 1.2rem;
  text-align: center;
`;

const StyledStripeCaret = styled.div`
  left: 102px;
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
  StyledStripe,
  StyledStripeAmounts,
  StyledStripeAmount,
  StyledStripeCaret,
};
