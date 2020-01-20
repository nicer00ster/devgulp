import { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { fetchPage } from '../../redux/actions';
import EnhancedHelp from '../../components/kit/help';
import Container from '../../components/kit/container';
import Loading from '../../components/kit/loading';

function Help(props) {
  useEffect(() => {
    props.fetchPage('help');
  }, []);

  return (
    <Container>
      <Head>
        <title>DevGulp - Help</title>
      </Head>
      {props.page.isFetchingPage ? (
        <Loading />
      ) : (
        <EnhancedHelp page={props.page.page} />
      )}
    </Container>
  );
}

const mapStateToProps = ({ page }) => ({
  page,
});

const mapDispatchToProps = {
  fetchPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Help);
