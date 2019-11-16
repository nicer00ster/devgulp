import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledNotifications = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  bottom: 24px;
  right: 36px;
  max-width: 420px;
  z-index: 2000;
  transition: transform 0.4s ease 0s;
  &:hover {
    transform: translate3d(0px, -5px, 0px);
  }
  ${props => props.theme.mediaQuery.phone`
      width: 82%;
      max-width: 100%;
  `};
`;

const StyledNotificationOuter = styled(animated.div)`
  width: 420px;
  position: relative;
  margin-top: 0.4rem;
  bottom: 0;
  right: 0;
  ${props => props.theme.mediaQuery.phone`
        width: 100%;
  `};
`;

const StyledNotificationInner = styled(animated.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 420px;
  height: 52px;
  border-radius: ${props => props.theme.effects.radius};
  ${props => props.theme.mediaQuery.phone`
        width: 100%;
  `};
`;

const StyledNotificationContent = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.canClose === false ? '1fr' : '1fr auto'};
  grid-gap: 10px;
  align-items: center;
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.effects.shadow};
  padding: 12px 22px;
  overflow: hidden;
  width: 100%;
  height: auto;
  border-radius: 3px;
  margin-top: ${props => (props.top ? '0' : '10px')};
  margin-bottom: ${props => (props.top ? '10px' : '0')};
  &.error {
    background: ${props => props.theme.colors.errorBackground};
  }
  &.warning {
    background: ${props => props.theme.colors.warningBackground};
  }
  &.success {
    background: ${props => props.theme.colors.successBackground};
  }
`;

const StyledNotificationButton = styled.button`
  display: flex;
  cursor: pointer;
  pointer-events: all;
  outline: 0;
  border: none;
  background: transparent;
  overflow: hidden;
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.5);
  height: 16px;
  width: 16px;
  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const StyledNotificationButtonClose = styled.div`
  cursor: pointer;
  position: relative;
  width: 16px;
  height: 16px;
  opacity: 0.3;
  z-index: 1001;
  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 16px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const StyledNotificationDuration = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  background: ${props => props.theme.colors.black};
  height: 3px;
  &.error {
    background: ${props => props.theme.colors.errorDuration};
  }
  &.warning {
    background: ${props => props.theme.colors.warningDuration};
  }
  &.success {
    background: ${props => props.theme.colors.successDuration};
  }
`;

export {
  StyledNotifications,
  StyledNotificationOuter,
  StyledNotificationInner,
  StyledNotificationContent,
  StyledNotificationButton,
  StyledNotificationButtonClose,
  StyledNotificationDuration,
};
