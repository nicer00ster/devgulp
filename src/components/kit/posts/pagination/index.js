import { StyledPagination, StyledPaginationItems,  StyledPaginationItem } from './pagination.styles';

function Pagination(props) {
  return (
    <StyledPagination>
        <StyledPaginationItems>
            <StyledPaginationItem className={props.page === 0 ? 'disabled' : ''}>
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        if (props.page < 1) return;
                        props.setPage(props.page - 1);
                    }}>
                    &#8810;
                </a>
            </StyledPaginationItem>
            {props.pages.map((page, index) => (
                <StyledPaginationItem
                    key={index}
                    className={page === props.page ? 'active' : ''}>
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            props.setPage(page);
                        }}>
                        {page + 1}
                    </a>
                </StyledPaginationItem>
            ))}
            <StyledPaginationItem
                className={props.page + 1 === props.totalPages ? 'disabled' : ''}>
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        if (props.postsLength < props.postCount) return;
                        props.setPage(props.page + 1);
                    }}>
                    &#8811;
                </a>
            </StyledPaginationItem>
        </StyledPaginationItems>
    </StyledPagination>
  );
}

export default Pagination;
