import styled from 'styled-components';

const StyledSearch = styled.div`
  display: grid;
  grid-template-columns: ${props => props.hasResults ? 'repeat(2, 1fr)' : '1fr'};
  justify-items: stretch;
  grid-gap: 12px;
  width: 100%;
  list-style: none;
  padding: 0;
  ${props => props.theme.mediaQuery.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

const StyledSearchNoResults = styled.p`
  color: tomato;
  text-align: center;
`;

export { StyledSearch, StyledSearchNoResults };
