import styled from 'styled-components';

const StyledHeadlineContainer = styled.div`
  position: relative;
  flex: 1;
  align-items: stretch;
`;

const StyledHeadline = styled.div`
  font-family: 'Trirong', serif;
`;

const StyledHeadlineTitle = styled.span`
  font-size: 3.2rem;
`;

const StyledHeadlineSubtitle = styled.span`
  font-size: 2rem;
`;

const StyledHeadlineBlurb = styled.p`
  font-size: 1.6rem;
  max-width: 80%;
`;

export {
  StyledHeadlineContainer,
  StyledHeadline,
  StyledHeadlineTitle,
  StyledHeadlineSubtitle,
  StyledHeadlineBlurb,
};
