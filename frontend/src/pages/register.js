import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Form from '../components/kit/form';
import Container from '../components/kit/container';
import Hero from '../components/kit/hero';

function Register(props) {
  const router = useRouter();

  useEffect(() => {
    if (props.token || props.isAuthenticated) {
      router.push('/');
    }
  }, [props.cookie, props.token]);

  return (
    <>
      <Hero></Hero>
      <Container>
        <Form />
      </Container>
    </>
  );
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
  isAuthenticated: user.isAuthenticated,
});

export default connect(
  mapStateToProps,
  null,
)(Register);