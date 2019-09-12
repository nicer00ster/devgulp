import styled from 'styled-components';

const StyledInput = styled.div`
  position: relative;
  input,
  textarea {
    background: none;
    color: ${props => props.theme.colors.black};
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightBlack};
    &[value]:not([value='']) ~ label,
    &:focus ~ label {
      top: -16px;
      left: 3px;
      font-size: 1rem;
      color: ${props => props.theme.colors.black};
    }
    &:focus ~ .bar:before {
      width: 100%;
    }
  }
  label {
    color: ${props => props.theme.colors.black};
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 6px;
    transition: 300ms ease all;
  }
  .bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      position: absolute;
      background: ${props => props.theme.colors.black};
      transition: 300ms ease all;
      left: 0;
    }
  }
`;

export { StyledInput };
