import { useEffect } from "react";
import { connect } from "react-redux";
import EnhancedPublish from "../components/kit/publish";
import { fetchCategories } from "../redux/actions";
import Container from '../components/kit/container';

function Publish(props) {
  useEffect(() => {
    props.fetchCategories();
  }, []);
  return (
      <Container>
        <EnhancedPublish />
      </Container>
  );
}

const mapDispatchToProps = {
  fetchCategories
};

export default connect(
  null,
  mapDispatchToProps
)(Publish);
