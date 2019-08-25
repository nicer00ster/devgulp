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
`;

export { StyledUsers, StyledUser };
