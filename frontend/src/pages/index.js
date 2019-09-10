import { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '../components/kit/container';
import EnhancedPosts from '../components/kit/posts';
import Editor from '../components/kit/editor';
import Hero from '../components/kit/hero';
import Loading from '../components/kit/loading';
import { fetchPosts, fetchCategories } from '../redux/actions';

function Index(props) {
  useEffect(() => {
    props.fetchCategories();
  }, []);
  return (
    <>
      <Hero>
        <Editor
          lines={{
            index: [
              'Welcome to DevGulp!',
              'Completely free and open source.',
              'Build your personal growth and career.',
              'No obnoxious fees to view content.',
              'Help our community grow by providing value.',
            ],
            styles: [
              'Completely customize your UI.',
              'Express yourself freely.',
              '.',
              '.',
              '.',
            ],
            server: [
              'Want to contribute to DevGulp?',
              'View our GitHub <a href="https://github.com/nicer00ster/devgulp" target="_blank" style="color: #80dad3;">here</a>.',
              '.',
              '.',
              '.',
            ],
          }}
        />
      </Hero>
      <Container>
        <EnhancedPosts />
        {props.isFetchingPosts && <Loading />}
      </Container>
    </>
  );
}

const mapStateToProps = ({ posts }) => ({
  isFetchingPosts: posts.isFetchingPosts,
  postCount: posts.postCount,
  posts: posts.posts,
});

const mapDispatchToProps = {
  fetchPosts,
  fetchCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
