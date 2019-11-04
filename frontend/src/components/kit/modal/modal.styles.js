import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledModal = styled(animated.div)``;

const StyledModalContainer = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const StyledModalItem = styled(animated.div)`
  position: relative;
  animation-duration: 0.75s;
  border-radius: ${props => props.theme.effects.radius};
  padding: 0.8rem;
  z-index: 1;
  min-width: 320px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.shadow};
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
  @media screen and (max-width: 520px) {
    min-width: 284px;
  }
`;

const StyledCloseModal = styled.button`
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 50px;
  border: none;
  z-index: 1;
  outline: 0;
  border-radius: 50%;
  box-shadow: ${props => props.theme.effects.shadow};
  top: 0;
  right: 0;
  padding: 0.4rem;
  transform: translate(20px, -20px);
  transition: all 0.075s ease-in;
  &:active {
    box-shadow: ${props => props.theme.effects.shadowHover};
    & i {
      font-size: 18px;
    }
  }
  &:focus {
    box-shadow: ${props => props.theme.effects.shadowHover};
  }
`;

const StyledCloseIcon = styled.i`
  color: ${props => props.theme.colors.lightBlack};
  pointer-events: none;
  font-size: 24px;
  transition: font-size 0.075s ease-in;
`;

export {
  StyledModal,
  StyledModalContainer,
  StyledModalItem,
  StyledCloseModal,
  StyledCloseIcon,
};
