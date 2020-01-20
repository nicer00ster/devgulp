import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchAuthor, fetchUserPosts } from '../../../redux/actions';
import SingleUser from '../../../components/kit/singleUser';
import Container from '../../../components/kit/container';

function User(props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    props.fetchAuthor(id);
    props.fetchUserPosts(id);
  }, [id]);
  return (
      <Container className="panelled">
        {props.author.author.name && (
          <Head>
            <title>{props.author.author.name}</title>
          </Head>
        )}
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
