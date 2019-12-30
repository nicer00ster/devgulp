import {
  StyledHeadlineContainer,
  StyledHeadline,
  StyledHeadlineTitle,
  StyledHeadlineSubtitle,
  StyledHeadlineBlurb,
} from './headline.styles';
import Button from '../../button';

function Headline(props) {
  return (
    <StyledHeadlineContainer>
      <StyledHeadline>
        <h1>
          <StyledHeadlineTitle>{props.title}</StyledHeadlineTitle>
          <br />
          <StyledHeadlineSubtitle>{props.subtitle}</StyledHeadlineSubtitle>
        </h1>
        <StyledHeadlineBlurb>
          The place to converse about development-related topics you're passionate
          about.
        </StyledHeadlineBlurb>
      </StyledHeadline>
      <Button>Start writing!</Button>
    </StyledHeadlineContainer>
  );
}

export default Headline;
