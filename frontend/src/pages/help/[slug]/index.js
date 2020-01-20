import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import { fetchPage } from '../../../redux/actions';
import EnhancedHelp from '../../../components/kit/help';
import Container from '../../../components/kit/container';
import Loading from '../../../components/kit/loading';

function Help(props) {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    props.fetchPage(slug);
  }, []);

  return (
    <Container>
      {props.page.page.title && (
        <Head>
          <title>DevGulp - Help - {props.page.page.title.rendered}</title>
        </Head>
      )}
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
