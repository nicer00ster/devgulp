import Router from 'next/router';
import { connect } from 'react-redux';
import {
  StyledHeadlineContainer,
  StyledHeadline,
  StyledHeadlineTitle,
  StyledHeadlineSubtitle,
  StyledHeadlineBlurb,
} from './headline.styles';
import Button from '../../button';
import { toggleSignUpMenu } from '../../../../redux/actions';

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
      {props.isAuthenticated ? (
        <Button onClick={() => Router.push('/publish')}>Start writing!</Button>
      ) : (
        <Button onClick={() => props.toggleSignUpMenu()}>Sign up!</Button>
      )}
    </StyledHeadlineContainer>
  );
}

const mapDispatchToProps = {
  toggleSignUpMenu,
};

export default connect(
  null,
  mapDispatchToProps,
)(Headline);
