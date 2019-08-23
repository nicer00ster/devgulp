import {StyledCheckboxCircle, StyledCheckboxInput, StyledCheckboxLabel, StyledCheckboxTitle,} from './checkbox.styles';

function Checkbox(props) {
    return (
        <StyledCheckboxLabel>
            <StyledCheckboxInput
                onChange={() => props.handleCategories(props.id)}
                type="checkbox"
            />
            <StyledCheckboxCircle/>
            <StyledCheckboxTitle>{props.label}</StyledCheckboxTitle>
        </StyledCheckboxLabel>
    );
}

export default Checkbox;
