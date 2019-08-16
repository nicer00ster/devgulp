import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/actions";
import EnhancedUsers from "../components/kit/users";
import Container from '../components/kit/container';

function Users(props) {
  useEffect(() => {
    props.fetchUsers();
  });
  return (
      <Container>
        <EnhancedUsers />
      </Container>
  );
}

const mapDispatchToProps = {
  fetchUsers
};

export default connect(
  null,
  mapDispatchToProps
)(Users);
