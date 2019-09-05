import styled from 'styled-components';

const StyledPagination = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 2rem 0;
`;

const StyledPaginationItem = styled.li`
  padding: 0.4rem 0.8rem;
  border-radius: ${props => props.theme.effects.radius};
  &.active {
    a {
      color: ${props => props.theme.colors.white};
    }
    background-color: ${props => props.theme.colors.black};
  }
`;

export { StyledPagination, StyledPaginationItem };
