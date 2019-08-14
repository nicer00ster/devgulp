import { connect } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SingleUser from "../components/kit/singleUser";
import { fetchAuthor } from "../redux/actions";

function User(props) {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    props.fetchAuthor(userId);
  }, []);

  return <SingleUser author={props.author} />;
}

const mapStateToProps = ({ author }) => ({
  author
});

const mapDispatchToProps = {
  fetchAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
