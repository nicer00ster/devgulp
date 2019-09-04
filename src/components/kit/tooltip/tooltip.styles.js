import styled from 'styled-components';

const StyledTooltip = styled.div`
  position: absolute;
  visibility: hidden;
  display: inline-block;
  z-index: 1;
  opacity: 0;
  padding: 0.5rem 0.75rem;
  background: ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.effects.radius};
  transition: all 0.3s ease-in-out;
  top: 100%;
  left: 50%;
  margin-top: 0.4rem;
  width: max-content;
  max-width: 150px;
  overflow-wrap: break-word;
  white-space: pre-line;
  border-collapse: separate;
  transform: translateX(-50%);
  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    z-index: 100001;
    pointer-events: none;
    border-width: 6px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    bottom: 100%;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    border-bottom-color: ${props => props.theme.colors.black};
  }
`;

const StyledTooltipContent = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 12px !important;
  color: ${props => props.theme.colors.white} !important;
  padding: 0 !important;
  text-align: center;
  cursor: inherit;
  -webkit-tap-highlight-color: transparent;
  outline: none;
`;

export { StyledTooltip, StyledTooltipContent };
