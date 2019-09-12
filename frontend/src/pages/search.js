import { connect } from 'react-redux';
import { searchQuery } from '../redux/actions';
import EnhancedSearch from '../components/kit/search';
import Hero from '../components/kit/hero';
import Container from '../components/kit/container';
import Loading from '../components/kit/loading';

function Search(props) {
  return (
    <>
      <Hero></Hero>
      <Container>
        <EnhancedSearch />
        {props.isSearching && <Loading />}
      </Container>
    </>
  );
}

const mapStateToProps = ({ search }) => ({
  isSearching: search.isSearching,
  query: search.query,
});

const mapDispatchToProps = {
  searchQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
