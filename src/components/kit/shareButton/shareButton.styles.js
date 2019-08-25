import styled from 'styled-components';

const StyledShareButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: ${props => props.theme.effects.shadow};
  background-color: ${props => props.theme.colors.white};
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 1.2rem;
  color: ${props => props.theme.colors.lightBlack};
  font-size: 20px;
  transition: all 0.25s ease-in-out;
  & i {
    position: absolute;
  }
  &.active {
    width: 32px;
    height: 32px;
    font-size: 14px;
    box-shadow: ${props => props.theme.effects.shadowHover};
    transform: translateY(50px);
    & .fa-share-alt {
      opacity: 0.5;
    }
  }
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.black};
  }
`;

export { StyledShareButton };
