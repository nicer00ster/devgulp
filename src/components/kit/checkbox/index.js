import {
  StyledCheckboxLabel,
  StyledCheckboxInput,
  StyledCheckboxTitle,
  StyledCheckboxCircle,
} from './checkbox.styles';

function Checkbox(props) {
  return (
    <StyledCheckboxLabel>
      <StyledCheckboxInput
        onChange={() => props.handleCategories(props.id)}
        type="checkbox"
      />
      <StyledCheckboxCircle />
      <StyledCheckboxTitle>{props.label}</StyledCheckboxTitle>
    </StyledCheckboxLabel>
  );
}

export default Checkbox;
