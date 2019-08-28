import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthor } from '../redux/actions';
import SingleUser from '../components/kit/singleUser';
import Container from '../components/kit/container';

function User(props) {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    props.fetchAuthor(userId);
  }, [userId]);

  return (
    <Container>
      <SingleUser author={props.author} />
    </Container>
  );
}

const mapStateToProps = ({ author }) => ({
  author,
});

const mapDispatchToProps = {
  fetchAuthor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
