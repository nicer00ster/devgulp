import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthor, fetchUserPosts } from '../redux/actions';
import SingleUser from '../components/kit/singleUser';
import Container from '../components/kit/container';

function User(props) {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    props.fetchAuthor(userId);
    props.fetchUserPosts(userId);
  }, [userId]);

  return (
    <Container className="panelled">
      <SingleUser author={props.author} posts={props.author.posts} />
    </Container>
  );
}

const mapStateToProps = ({ author }) => ({
  author,
});

const mapDispatchToProps = {
  fetchAuthor,
  fetchUserPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
