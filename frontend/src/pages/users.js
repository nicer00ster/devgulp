import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { fetchUsers, openLoginMenu } from '../redux/actions';
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
    } else {
      props.fetchUsers();
    }
  }, []);
  return (
    <>
      <Hero></Hero>
      <Container>
        <EnhancedUsers users={props.users} />
      </Container>
    </>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

const mapDispatchToProps = {
  fetchUsers,
  openLoginMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
