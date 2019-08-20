import { connect } from 'react-redux';
import { StyledSearch } from './search.styles';
import PostItem from '../posts/PostItem';

function EnhancedSearch(props) {
  return (
    <StyledSearch>
      {props.results &&
        props.results.map(post => <PostItem key={post.id} post={post} />)}
    </StyledSearch>
  );
}

const mapStateToProps = ({ search }) => ({
  results: search.results,
});

export default connect(
  mapStateToProps,
  null,
)(EnhancedSearch);
