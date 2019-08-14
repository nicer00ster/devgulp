import styled from "styled-components";
import { animated } from "react-spring";

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
  padding: 12px;
  z-index: 1;
  min-width: 320px;
  background-color: ${props => props.theme.colors.white};
  //height: 200px;
  box-shadow: ${props => props.theme.effects.shadow};
  @media screen and (max-width: 520px) {
    min-width: 284px;
  }
`;

const StyledCloseModal = styled.i`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.4rem;
`;

export { StyledModal, StyledModalContainer, StyledModalItem, StyledCloseModal };
