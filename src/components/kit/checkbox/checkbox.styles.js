import styled from 'styled-components';

const StyledCheckboxLabel = styled.label`
  display: inline-flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  font-size: 10px;
  padding: 0.4rem 0;
  width: 25%;
  font-family: 'Trirong', serif;
`;

const StyledCheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span {
    background-color: ${props => props.theme.colors.black};
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.black};
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  &:checked ~ span:after {
    border-width: 0 1px 1px 0;
  }
  &:checked ~ span:before {
    left: -1px;
    top: -1px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: scale(2);
    opacity: 0;
    z-index: 999;
    transition: all 0.25s ease-out;
  }
  &:focus ~ div {
    font-weight: 900;
  }
  &:focus ~ span {
    outline: none;
  }
`;

const StyledCheckboxTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-size: 12px;
  color: ${props => props.theme.colors.black};
  font-weight: 300;
  transition: all 0.15s ease-in;
`;

const StyledCheckboxCircle = styled.span`
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.black};
  height: 16px;
  width: 16px;
  background-color: transparent;
  transition: all 0.3s ease-out;
  &:before {
    position: absolute;
    content: '';
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.black};
    transform: scale(0);
  }
`;

export {
  StyledCheckboxLabel,
  StyledCheckboxInput,
  StyledCheckboxTitle,
  StyledCheckboxCircle,
};
