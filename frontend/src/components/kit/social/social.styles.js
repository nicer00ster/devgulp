import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledSocial = styled(animated.div)`
  position: absolute;
  display: flex;
  right: ${props => (props.type === 'sidebar' ? '' : '50%')};
  top: 0;
`;

const StyledSocialButton = styled(animated.a)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  outline: 0;
  box-shadow: ${props => props.theme.effects.shadowHover};
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  top: 0;
  will-change: transform, opacity;
  transition: all 0.075s ease-in;
  &:focus {
    box-shadow: 1px 2px 4px 0px rgba(46, 61, 73, 0.2);
  }
  &:active {
    top: 2px;
    box-shadow: 1px 2px 4px 0px rgba(46, 61, 73, 0.2);
    & i {
      font-size: 16px;
    }
  }
`;

const StyledSocialIcon = styled.i`
  color: ${props => props.color};
  pointer-events: none;
  font-size: 18px;
  transition: font-size 0.075s ease-in;
`;

export { StyledSocial, StyledSocialButton, StyledSocialIcon };
