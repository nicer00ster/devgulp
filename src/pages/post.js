import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchPost } from '../redux/actions';
import SinglePost from '../components/kit/singlePost';
import Container from '../components/kit/container';
import Loading from '../components/kit/loading';
import Hero from '../components/kit/hero';

function Post(props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    props.fetchPost(id);
  }, []);

  if (props.post.isFetchingPost) {
    return <Loading />;
  }
  return (
    <>
      <Hero></Hero>
      <Container>
        <SinglePost post={props.post} />
      </Container>
    </>
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
