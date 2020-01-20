import { connect } from 'react-redux';
import Head from 'next/head';
import { searchQuery } from '../redux/actions';
import EnhancedSearch from '../components/kit/search';
import Container from '../components/kit/container';
import Loading from '../components/kit/loading';

function Search(props) {
  return (
    <Container>
      <Head>
        <title>DevGulp - Search</title>
      </Head>
      <EnhancedSearch />
      {props.isSearching && <Loading />}
    </Container>
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
