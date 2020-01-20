import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import { fetchUsers, openLoginMenu, logout } from '../redux/actions';
import { AppContext } from '../components/kit/notifications/provider';
import EnhancedUsers from '../components/kit/users';
import Container from '../components/kit/container';
import Hero from '../components/kit/hero';

function Users(props) {
  const router = useRouter();
  const { addNotification } = useContext(AppContext);

  useEffect(() => {
    if (!props.cookie) {
      router.push('/');
      addNotification('Sign in to view other users!', 'warning');
      props.logout(props.token);
    } else {
      props.fetchUsers();
    }
  }, []);
  return (
    <>
      <Head>
        <title>DevGulp - Users</title>
      </Head>
      <Hero></Hero>
      <Container>
        <EnhancedUsers users={props.users} />
      </Container>
    </>
  );
}

const mapStateToProps = ({ user, users }) => ({
  token: user.token,
  ...users,
});

const mapDispatchToProps = {
  fetchUsers,
  openLoginMenu,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
