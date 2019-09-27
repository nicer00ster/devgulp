import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSpring, config } from 'react-spring';
import Link from 'next/link';
import {
  StyledPosts,
  StyledNoResults,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
} from './posts.styles';
import {
  fetchPosts,
  fetchPostsByCategory,
  filterTaxonomy,
} from '../../../redux/actions';
import PostItem from './PostItem';
import FeaturedPost from './FeaturedPost';
import Pagination from './pagination';

function EnhancedPosts(props) {
  const [activeFilter, setActiveFilter] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [page, setPage] = useState(0);
  const currentFilter = props.categories.map(category =>
    category.id === props.taxonomyFilter ? category.name : null,
  );

  function handleFilter(id) {
    setActiveFilter(id);
    setPage(0);
    props.filterTaxonomy(id);
    props.fetchPostsByCategory(id, props.postCount, 0, props.totalPosts);
  }

  function pages() {
    let arr = [];

    for (let i = 0; i < props.totalPages; i++) {
      arr.push(i);
    }

    return arr;
  }

  useEffect(() => {
    if (activeFilter === 1) {
      props.fetchPosts(props.postCount, page, props.totalPosts);
    }
  }, [page]);

  const spring = useSpring({
    config: config.wobbly,
    opacity: props.isFetchingPosts ? 0 : 1,
    transform: props.isFetchingPosts ? 'translateX(-150px)' : 'translateX(0px)',
  });

  return (
    <>
      <FeaturedPost post={featuredPost} />
      <StyledFilterNav
        loginMenuOpen={props.loginMenuOpen}
        userMenuOpen={props.userMenuOpen}>
        <StyledFilterItems className="filter-items">
          {props.categories &&
            props.categories.map(category => (
              <StyledFilterItem
                key={category.id}
                className={activeFilter === category.id && 'active-filter'}
                onClick={() => handleFilter(category.id)}>
                {category.name === 'Uncategorized' ? 'All' : category.name}
              </StyledFilterItem>
            ))}
        </StyledFilterItems>
      </StyledFilterNav>
      <StyledPosts
        className={!props.posts.length ? 'no-results' : ''}
        style={spring}>
        {props.posts &&
          props.posts.map(post => <PostItem key={post.id} post={post} />)}
        {!props.posts.length ? (
          <StyledNoResults>
            No articles have been posted about {currentFilter}. Be the{' '}
            <Link href="/publish">
              <a>first</a>
            </Link>
            !
          </StyledNoResults>
        ) : null}
      </StyledPosts>
      {props.posts.length ? (
        <Pagination
          pages={pages()}
          totalPosts={props.totalPosts}
          totalPages={props.totalPages}
          postCount={props.postCount}
          postsLength={props.posts.length}
          setPage={setPage}
          page={page}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  categories: posts.categories,
  taxonomyFilter: posts.taxonomyFilter,
  postCount: posts.postCount,
  isFetchingPosts: posts.isFetchingPosts,
  totalPosts: posts.totalPosts,
  totalPages: posts.totalPages,
});

const mapDispatchToProps = {
  fetchPosts,
  fetchPostsByCategory,
  filterTaxonomy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedPosts);
