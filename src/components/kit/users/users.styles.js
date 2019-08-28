import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledUsers = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`;

const StyledUser = styled(animated.li)`
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: ${props => props.theme.effects.shadow};
  border-radius: 50%;
  width: 72px;
  height: 72px;
  margin: .4rem;
  bottom: 0;
  transition: bottom 0.15s ease-in, box-shadow 0.15s ease-in;
  &:hover,
  &:focus {
    bottom: 4px;
    box-shadow: ${props => props.theme.effects.shadowHover};
    & div {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export { StyledUsers, StyledUser };
