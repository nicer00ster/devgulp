import Error from 'next/error';
import Router from 'next/router';
import {
  StyledHelp,
  StyledHelpHeader,
  StyledHelpHeaderWrapper,
  StyledHelpHeaderCircle,
  StyledHelpHeaderIcon,
  StyledHelpContent,
  StyledHelpBack,
} from './help.styles';

function EnhancedHelp(props) {
  if (!props.page.content) {
    return <Error statusCode={404} />;
  }
  console.log(props.page);
  return (
    <StyledHelp>
      <StyledHelpHeader>
        {props.page.slug !== 'help' && (
          <StyledHelpBack onClick={() => Router.back()}>
            <i className="fal fa-arrow-left" />
            Back
          </StyledHelpBack>
        )}
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
