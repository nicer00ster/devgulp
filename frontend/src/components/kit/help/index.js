import Error from 'next/error';
import {
  StyledHelp,
  StyledHelpHeader,
  StyledHelpHeaderWrapper,
  StyledHelpHeaderCircle,
  StyledHelpHeaderIcon,
  StyledHelpContent,
} from './help.styles';

function EnhancedHelp(props) {
  if(!props.page.content) {
    return <Error statusCode={404} />
  }
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
