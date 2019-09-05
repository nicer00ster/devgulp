import styled from 'styled-components';

const StyledPagination = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  border: 1px solid ${props => props.theme.colors.lightBlack};
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.white};
`;

const StyledPaginationItem = styled.li`
  padding: 0.4rem auto;
  a {
    padding: 0.4rem 0.8rem;
    border-radius: ${props => props.theme.effects.radius};
  }
  &.active {
    a {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.black};
    }
  }
  &.disabled {
    a {
      color: ${props => props.theme.colors.grey};
    }
  }
`;

export { StyledPagination, StyledPaginationItem };
