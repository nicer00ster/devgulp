import {
    StyledPrivacyPolicy,
} from './privacyPolicy.styles';

function PrivacyPolicy(props) {
    return (
        <StyledPrivacyPolicy>
            <div dangerouslySetInnerHTML={{ __html: props.page.content.rendered }} />
        </StyledPrivacyPolicy>
    );
}

export default PrivacyPolicy;
