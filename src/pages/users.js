import { useEffect } from "react";
import { connect } from "react-redux";
import EnhancedUsers from "../components/kit/users";
import { fetchUsers } from "../redux/actions";

function Users(props) {
  useEffect(() => {
    props.fetchUsers();
  });
  return <EnhancedUsers />;
}

const mapDispatchToProps = {
  fetchUsers
};

export default connect(
  null,
  mapDispatchToProps
)(Users);
