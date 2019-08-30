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
  & div.grid {
    align-content: end;
    min-width: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    opacity: 0.6;
    grid-template-rows: repeat(auto-fill, 64px);
    grid-template-columns: [viewport-start] 0px [left-gutter-start] 0px 0px 0px 0px [left-gutter-end content-start] 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw 10vw [content-end right-gutter-start] 0px 0px 0px 0px [right-gutter-end] 0px [viewport-end];
    & div.stripe {
      transition: width 0.25s linear;
      width: ${props => (props.userMenuOpen ? '75%' : '100%')};
      &:nth-of-type(1) {
        grid-row: -2;
        grid-column: 14 / span 2;
        border: 1px solid ${props => props.theme.colors.black};
      }
      &:nth-of-type(2) {
        grid-row: -2;
        grid-column: 14 / span 2;
        background-color: ${props => props.theme.colors.green};
        transform: translate(-8px, 8px);
      }
      &:nth-of-type(3) {
        grid-row: -4;
        grid-column: 12 / span 4;
        border: 1px solid ${props => props.theme.colors.green};
        transform: translate(-8px, 8px);
      }
      &:nth-of-type(4) {
        grid-row: -4;
        grid-column: 12 / span 4;
        background-color: ${props => props.theme.colors.black};
      }
      &:nth-of-type(5) {
        grid-row: -2;
        grid-column: 10 / span 2;
        background-color: ${props => props.theme.colors.black};
      }
      &:nth-of-type(6) {
        grid-row: -2;
        grid-column: 6 / span 3;
        background-color: ${props => props.theme.colors.green};
      }
      &:nth-of-type(7) {
        grid-row: -3;
        grid-column: 10 / span 1;
        background-color: ${props => props.theme.colors.green};
      }
      &:nth-of-type(8) {
        grid-row: -3;
        grid-column: 6 / span 1;
        background-color: ${props => props.theme.colors.black};
      }
      &:nth-of-type(9) {
        grid-row: 0;
        grid-column: 6 / span 1;
        background-color: ${props => props.theme.colors.black};
      }
      &:nth-of-type(10) {
        grid-row: 1;
        grid-column: 6 / span 4;
        background-color: ${props => props.theme.colors.green};
      }
      &:nth-of-type(11) {
        grid-row: 4;
        grid-column: 6 / span 2;
        background-color: ${props => props.theme.colors.green};
        transform: translate(-8px, 8px);
        z-index: -1;
      }
      &:nth-of-type(12) {
        grid-row: 4;
        grid-column: 6 / span 2;
        border: 1px solid ${props => props.theme.colors.black};
        z-index: -1;
      }
      &:nth-of-type(13) {
        grid-row: 2;
        grid-column: 13 / span 3;
        background-color: ${props => props.theme.colors.black};
      }
    }
  }
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
  box-shadow: inset 0 4px 7px 1px #fefefe, inset 0 -5px 20px rgba(173,186,204,.25), 0 2px 6px rgba(0,21,64,.14), 0 10px 20px rgba(0,21,64,.05);
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
  box-shadow: inset 0 4px 7px 1px #fefefe, inset 0 -5px 20px rgba(173,186,204,.25), 0 2px 6px rgba(0,21,64,.14), 0 10px 20px rgba(0,21,64,.05);
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
    box-shadow: inset 0 4px 7px 1px #fefefe, inset 0 -5px 20px rgba(173,186,204,.25), 0 2px 6px rgba(0,21,64,.14), 0 10px 20px rgba(0,21,64,.05);
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
    box-shadow: inset 0 4px 7px 1px #fff, inset 0 -5px 20px rgba(173,186,204,.25), 0 2px 6px rgba(0,21,64,.14), 0 10px 20px rgba(0,21,64,.05);
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
