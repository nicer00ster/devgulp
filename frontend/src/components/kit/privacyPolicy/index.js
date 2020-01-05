import {
  StyledPrivacyPolicy,
  StyledPrivacyPolicyHeading,
} from './privacyPolicy.styles';

function PrivacyPolicy(props) {
  return (
    <StyledPrivacyPolicy>
      <StyledPrivacyPolicyHeading>
        {props.page.title.rendered}
      </StyledPrivacyPolicyHeading>
      <div dangerouslySetInnerHTML={{ __html: props.page.content.rendered }} />
    </StyledPrivacyPolicy>
  );
}

export default PrivacyPolicy;
