import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { AppContext } from '../components/kit/notifications/provider';
import { fetchCategories, openLoginMenu } from '../redux/actions';
import EnhancedPublish from '../components/kit/publish';
import Container from '../components/kit/container';

function Publish(props) {
  const router = useRouter();
  const { addNotification } = useContext(AppContext);

  useEffect(() => {
    if (!props.cookie) {
      router.push('/');
      addNotification('Sign in to start publishing stories!');
    } else {
      props.fetchCategories();
    }
  }, []);
  return (
    <Container>
      <EnhancedPublish />
    </Container>
  );
}

const mapDispatchToProps = {
  fetchCategories,
  openLoginMenu,
};

export default connect(
  null,
  mapDispatchToProps,
)(Publish);
