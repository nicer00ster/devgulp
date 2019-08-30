import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${props => props.theme.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10000;
  opacity: ${props => (props.userMenuOpen ? '0.2    5' : '0.5')};
  width: 150vw;
  transition: opacity 0.25s linear;
  transform: rotate(-12deg);
  transform-origin: 0 100%;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const StyledBackgroundDevices = styled(animated.div)`
  display: flex;
  align-self: flex-start;
`;

const StyledBackgroundTablet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 512px;
  height: 352px;
  border-radius: 38px;
  margin-left: 50px;
  z-index: 1;
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.white};
  box-shadow: inset 0 4px 7px 1px #fefefe,
    inset 0 -5px 20px rgba(173, 186, 204, 0.25), 0 2px 6px rgba(0, 21, 64, 0.14),
    0 10px 20px rgba(0, 21, 64, 0.05);
  transform: translateY(${props => props.offset}px);
`;

const StyledBackgroundPhone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 38px;
  height: 467px;
  width: 225px;
  margin-left: 50px;
  z-index: 1;
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.white};
  box-shadow: inset 0 4px 7px 1px #fefefe,
    inset 0 -5px 20px rgba(173, 186, 204, 0.25), 0 2px 6px rgba(0, 21, 64, 0.14),
    0 10px 20px rgba(0, 21, 64, 0.05);
  transform: translateY(${props => props.offset}px);
`;

const StyledBackgroundBigPhone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 267px;
  height: 553px;
  margin-left: 50px;
  border-radius: 38px;
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.white};
  z-index: 1;
  box-shadow: inset 0 4px 7px 1px #fefefe,
    inset 0 -5px 20px rgba(173, 186, 204, 0.25), 0 2px 6px rgba(0, 21, 64, 0.14),
    0 10px 20px rgba(0, 21, 64, 0.05);
  transform: translateY(${props => props.offset}px);
`;

const StyledBackgroundBigTablet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 675px;
  margin-left: 50px;
  border-radius: 38px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grey};
  z-index: 1;
  box-shadow: inset 0 4px 7px 1px #fff,
    inset 0 -5px 20px rgba(173, 186, 204, 0.25), 0 2px 6px rgba(0, 21, 64, 0.14),
    0 10px 20px rgba(0, 21, 64, 0.05);
  transform: translateY(${props => props.offset}px);
`;

export {
  StyledBackground,
  StyledBackgroundDevices,
  StyledBackgroundTablet,
  StyledBackgroundPhone,
  StyledBackgroundBigPhone,
  StyledBackgroundBigTablet,
};
