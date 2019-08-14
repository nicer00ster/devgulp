import { useEffect } from "react";
import { connect } from "react-redux";
import EnhancedPublish from "../components/kit/publish";
import { fetchCategories } from "../redux/actions";

function Publish(props) {
  useEffect(() => {
    props.fetchCategories();
  }, []);
  return <EnhancedPublish />;
}

const mapDispatchToProps = {
  fetchCategories
};

export default connect(
  null,
  mapDispatchToProps
)(Publish);
