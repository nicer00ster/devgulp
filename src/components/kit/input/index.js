import { StyledInput } from './input.styles';

function Input(props) {
  return (
    <StyledInput style={{ ...props.styles }}>
      <input
        autoFocus={props.autoFocus}
        type={props.type}
        name={props.name}
        id={props.name}
        style={props.error ? { borderBottom: '1px solid tomato' } : {}}
        {...props.bind}
      />
      <span className="bar" />
      <label htmlFor={props.name} style={props.error ? { color: 'tomato' } : {}}>
        {props.label}
      </label>
    </StyledInput>
  );
}

export default Input;
