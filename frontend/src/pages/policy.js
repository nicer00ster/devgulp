import { useEffect } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { fetchPage } from '../redux/actions';
import PrivacyPolicy from '../components/kit/privacyPolicy';
import Container from '../components/kit/container';
import Loading from '../components/kit/loading';

function Policy(props) {
  useEffect(() => {
    props.fetchPage('privacy-policy');
  }, []);

  return (
    <Container>
      <Head>
        <title>DevGulp - Privacy Policy</title>
      </Head>
      {props.page.isFetchingPage ? (
        <Loading />
      ) : (
        <PrivacyPolicy page={props.page.page} />
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
)(Policy);
