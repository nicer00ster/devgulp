import styled from 'styled-components';

const StyledUserMessage = styled.div`
  position: fixed;
  width: 300px;
  bottom: 100px;
  left: 0;
  box-shadow: ${props => props.theme.effects.shadow};
  border-top-right-radius: ${props => props.theme.effects.radius};
  border-top-left-radius: ${props => props.theme.effects.radius}; 
  background-color: ${props => props.theme.colors.white};
`;

export {
    StyledUserMessage,
};
