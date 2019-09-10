import {
  StyledHelp,
  StyledHelpHeader,
  StyledHelpHeaderWrapper,
  StyledHelpHeaderCircle,
  StyledHelpHeaderIcon,
  StyledHelpContent,
} from './help.styles';

function EnhancedHelp(props) {
  return (
    <StyledHelp>
      <StyledHelpHeader>
        <StyledHelpHeaderWrapper>
          <StyledHelpHeaderCircle>
            <StyledHelpHeaderIcon className="fal fa-life-ring" />
          </StyledHelpHeaderCircle>
        </StyledHelpHeaderWrapper>
      </StyledHelpHeader>
      <StyledHelpContent
        dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
      />
    </StyledHelp>
  );
}

export default EnhancedHelp;
