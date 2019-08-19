import { useEffect } from "react";
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import EnhancedPublish from "../components/kit/publish";
import { fetchCategories, openLoginMenu } from "../redux/actions";
import Container from '../components/kit/container';

function Publish(props) {
  const router = useRouter();

  useEffect(() => {
    if(!props.cookie) {
        router.push('/');
        props.openLoginMenu();
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
  mapDispatchToProps
)(Publish);
