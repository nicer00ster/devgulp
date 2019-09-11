import styled from 'styled-components';

const StyledEditProfile = styled.div`
  margin: 4rem 0;
`;

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  & button {
    align-self: flex-start;
    margin: 1.2rem;
  }
`;

const StyledEditInputFields = styled.div`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  & div {
    flex: 1;
    margin: 1.2rem;
  }
`;

export { StyledEditProfile, StyledEditForm, StyledEditInputFields };
