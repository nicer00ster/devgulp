import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { fetchUsers, openLoginMenu } from '../redux/actions';
import EnhancedUsers from '../components/kit/users';
import Container from '../components/kit/container';
import Hero from '../components/kit/hero';

function Users(props) {
  const router = useRouter();

  useEffect(() => {
    if (!props.cookie) {
      router.push('/');
      //  TODO: Warn user to login in order to view this page.
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
