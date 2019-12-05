import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { AppContext } from '../components/kit/notifications/provider';
import { fetchCategories, openLoginMenu } from '../redux/actions';
import Container from '../components/kit/container';
import Form from '../components/kit/form';

function ResetPassword(props) {
  const router = useRouter();
  const { addNotification } = useContext(AppContext);

  useEffect(() => {
    // if (!props.cookie) {
    //     router.push('/');
    //     addNotification('Sign in to start publishing stories!', 'warning');
    // } else {
    //     props.fetchCategories();
    // }
  }, []);
  return (
    <Container>
      <Form type="reset" label="Reset your password" />
    </Container>
  );
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps,
)(ResetPassword);
