import { connect } from 'react-redux';
import { StyledSearch, StyledSearchNoResults } from './search.styles';
import PostItem from '../posts/PostItem';

function EnhancedSearch(props) {
  const posts = props.results.filter(post => post.subtype === 'post');
  return (
    <StyledSearch hasResults={posts.length > 0}>
      {posts && props.hasSearched && !posts.length ? (
        <StyledSearchNoResults>
          Nothing found for your search.
        </StyledSearchNoResults>
      ) : (
        posts.map(post => <PostItem key={post.id} post={post} />)
      )}
    </StyledSearch>
  );
}

const mapStateToProps = ({ search }) => ({
  hasSearched: search.hasSearched,
  results: search.results,
});

export default connect(
  mapStateToProps,
  null,
)(EnhancedSearch);
