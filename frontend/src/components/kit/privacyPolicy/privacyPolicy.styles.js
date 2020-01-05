import styled from 'styled-components';

const StyledPrivacyPolicy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.effects.radius};
  box-shadow: ${props => props.theme.effects.shadow};
  padding: 1.2rem;
`;

const StyledPrivacyPolicyHeading = styled.h1``;

export { StyledPrivacyPolicy, StyledPrivacyPolicyHeading };
