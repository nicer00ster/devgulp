import { useEffect } from "react";
import { connect } from "react-redux";

import Container from '../components/kit/container';
import EnhancedPosts from "../components/kit/posts";
import { fetchPosts, fetchCategories } from "../redux/actions";

function Index(props) {
  useEffect(() => {
    props.fetchPosts();
    props.fetchCategories();
  });
  return (
      <Container>
        <EnhancedPosts />
      </Container>
  );
}

const mapDispatchToProps = {
  fetchPosts,
  fetchCategories
};

export default connect(
  null,
  mapDispatchToProps
)(Index);
