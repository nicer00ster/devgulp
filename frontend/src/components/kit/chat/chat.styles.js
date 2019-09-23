import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledChatContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const StyledChat = styled(animated.form)`
  position: sticky;
  bottom: 0;
  left: 100%;
  width: 300px;
  box-shadow: ${props => props.theme.effects.shadow};
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-top-left-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
`;

const StyledChatDisconnected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0.5;
  i {
    font-size: 36px;
  }
`;

const StyledChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  cursor: pointer;
`;

const StyledChatHeaderMessaging = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0.4rem;
`;

const StyledChatHeaderButton = styled.button`
  background: none;
  border: 0;
  font-size: 16px;
  cursor: pointer;
  color: ${props => props.theme.colors.lightBlack};
  transition: transform 0.25s ease-in;
  &.opened {
    transform: rotate(180deg);
  }
  i {
    color: ${props => props.theme.colors.lightBlack};
    &.online {
      color: ${props => props.theme.colors.green};
    }
    &.offline {
      color: ${props => props.theme.colors.red};
    }
  }
`;

const StyledChatContent = styled(animated.fieldset)`
  outline: 0;
  padding: 0;
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  overflow-y: scroll;
  pointer-events: ${props => props.connected ? 'all' : 'none'};
`;

const StyledChatMessage = styled(animated.div)``;

const StyledChatInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.grey};
  border: 0;
  padding: 0.4rem;
`;

const StyledChatUser = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  color: ${props => props.theme.colors.lightBlack};
  cursor: pointer;
  transition: background-color 0.25s ease-in;
  &.is-messaging {
    background-color: ${props => props.theme.colors.lightGreen};
  }
  &:hover:not(.is-messaging) {
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.colors.black};
  }
`;

const StyledChatHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  padding: 0.8rem 0.4rem;
`;

const StyledChatHeaderButtons = styled.div`
  flex: 0 1 auto;
  padding: 0.8rem 0.4rem;
`;

export {
  StyledChatContainer,
  StyledChat,
  StyledChatDisconnected,
  StyledChatHeader,
  StyledChatContent,
  StyledChatHeaderMessaging,
  StyledChatHeaderButton,
  StyledChatMessage,
  StyledChatInput,
  StyledChatUser,
  StyledChatHeaderContainer,
  StyledChatHeaderButtons,
};
