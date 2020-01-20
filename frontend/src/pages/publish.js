import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import { AppContext } from '../components/kit/notifications/provider';
import { fetchCategories, openLoginMenu, logout } from '../redux/actions';
import EnhancedPublish from '../components/kit/publish';
import Container from '../components/kit/container';

function Publish(props) {
  const router = useRouter();
  const { addNotification } = useContext(AppContext);

  useEffect(() => {
    if (!props.cookie) {
      router.push('/');
      addNotification('Sign in to start publishing stories!', 'warning');
      props.logout(props.token);
    } else {
      props.fetchCategories();
    }
  }, []);
  return (
    <Container>
      <Head>
        <title>DevGulp - Publish A Story</title>
      </Head>
      <EnhancedPublish />
    </Container>
  );
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

const mapDispatchToProps = {
  fetchCategories,
  openLoginMenu,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Publish);
