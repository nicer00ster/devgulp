import {connect} from 'react-redux';
import {StyledSearch, StyledSearchNoResults} from './search.styles';
import PostItem from '../posts/PostItem';

function EnhancedSearch(props) {
    return (
        <StyledSearch hasResults={props.results.length > 0}>
            {props.results && props.hasSearched && !props.results.length ? (
                <StyledSearchNoResults>
                    Nothing found for your search.
                </StyledSearchNoResults>
            ) : (
                props.results.map(post => <PostItem key={post.id} post={post}/>)
            )}
        </StyledSearch>
    );
}

const mapStateToProps = ({search}) => ({
    hasSearched: search.hasSearched,
    results: search.results,
});

export default connect(
    mapStateToProps,
    null,
)(EnhancedSearch);
