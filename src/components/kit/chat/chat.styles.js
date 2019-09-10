import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledChat = styled(animated.form)`
  position: fixed;
  width: 300px;
  bottom: 0;
  right: 0;
  box-shadow: ${props => props.theme.effects.shadow};
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-top-left-radius: ${props => props.theme.effects.radius}; 
  background-color: ${props => props.theme.colors.white};
`;

const StyledChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: .8rem .4rem;
  cursor: pointer;
`;

const StyledChatHeaderMessaging = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: .4rem;
`;

const StyledChatHeaderNewMessage = styled.button`
  background: none;
  border: 0;
  font-size: 16px;
  cursor: pointer;
  color: ${props => props.theme.colors.lightBlack};
  transition: transform 0.25s ease-in;
  &.opened {
    transform: rotate(180deg);
  }
`;

const StyledChatContent = styled(animated.div)`
  border-radius: ${props => props.theme.effects.radius};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  overflow-y: scroll;
`;

const StyledChatMessage = styled(animated.div)`

`;

const StyledChatInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.grey};
  border: 0;
  padding: .4rem;
`;

const StyledChatUser = styled.div`
  display: flex;
  align-items: center;
  padding: .4rem;
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

export {
  StyledChat,
  StyledChatHeader,
  StyledChatContent,
  StyledChatHeaderMessaging,
  StyledChatHeaderNewMessage,
  StyledChatMessage,
  StyledChatInput,
  StyledChatUser,
};
