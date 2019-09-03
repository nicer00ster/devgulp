import { StyledTooltip, StyledTooltipContent } from './tooltip.styles';

function Tooltip(props) {
  return (
    <StyledTooltip>
      <StyledTooltipContent>
          {props.content}
      </StyledTooltipContent>
    </StyledTooltip>
  );
}

export default Tooltip;
