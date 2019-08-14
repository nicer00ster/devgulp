import dynamic from "next/dynamic";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import SinglePost from "../components/kit/singlePost";
import { fetchPost } from "../redux/actions";

function Post(props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    props.fetchPost(id);
  }, []);

  return <SinglePost post={props.post} />;
}

const mapStateToProps = ({ post }) => ({
  post
});

const mapDispatchToProps = {
  fetchPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
