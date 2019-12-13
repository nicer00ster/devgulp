import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Error from '../../_error';
import { fetchPost } from '../../../redux/actions';
import SinglePost from '../../../components/kit/singlePost';
import Container from '../../../components/kit/container';
import Loading from '../../../components/kit/loading';

function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  const postId = props.post.post.id;

  useEffect(() => {
    props.fetchPost(id);
  }, []);

  if (props.post.isFetchingPost) {
    return <Loading />;
  }
  if (!postId) {
    return <Error statusCode={404} />;
  }
  return (
    <Container>
      <SinglePost post={props.post} />
    </Container>
  );
}

const mapStateToProps = ({ post }) => ({
  post,
});

const mapDispatchToProps = {
  fetchPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
