import { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '../components/kit/container';
import EnhancedPosts from '../components/kit/posts';
import Headline from '../components/kit/hero/headline';
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
        <Headline
          title="DevGulp"
          subtitle="A platform built for developers, by developers."
        />
        <Editor
          lines={{
            index: [
              'Welcome to DevGulp!',
              'Completely free and open source.',
              'Build your personal growth and career.',
              'No obnoxious fees to view content.',
              'Or annoying ads that interrupt you.',
            ],
            styles: [
              'A new developer driven platform.',
              "Intuitive design that's easy to use.",
              'Help other developers by providing value.',
              'While easily absorbing content.',
              'And expressing yourself freely.',
            ],
            server: [
              'Help the internet become free and open.',
              'The future of the web is in your hands.',
              'Want to contribute to DevGulp?',
              'All levels of experience welcomed!',
              'View our GitHub <a href="https://github.com/nicer00ster/devgulp" target="_blank" style="color: #80dad3;">here</a>.',
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
