import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTransition, useSpring, config } from 'react-spring';
import Link from 'next/link';
import {
  StyledPosts,
  StyledPostsContainer,
  StyledNoResults,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
} from './posts.styles';
import { fetchPosts, filterTaxonomy } from '../../../redux/actions';
import PostItem from './PostItem';
import Pagination from './pagination';

function EnhancedPosts(props) {
  const [activeFilter, setActiveFilter] = useState(1);
  const [page, setPage] = useState(0);
  const filteredPosts = props.posts.filter(post => post.isFiltered);
  const currentFilter = props.categories.map(category =>
    category.id === props.taxonomyFilter ? category.name : null,
  );

  function handleFilter(id) {
    setActiveFilter(id);
    props.filterTaxonomy(id);
  }

  function pages() {
    let arr = [];

    for (let i = 0; i < props.totalPages; i++) {
      arr.push(i);
    }

    return arr;
  }

  const fetchPosts = () => {
    if (props.postCount >= props.totalPosts) return;
    props.fetchPosts(props.postCount, page, props.totalPosts);
  };

  useEffect(() => {
    props.fetchPosts(props.postCount, page, props.totalPosts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const spring = useSpring({
    config: config.wobbly,
    opacity: props.isFetchingPosts ? 0 : 1,
    transform: props.isFetchingPosts ? 'translateX(-150px)' : 'translateX(0px)',
  });

  return (
    <>
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
      <StyledPosts noResults={filteredPosts.length === 0}>
        {props.posts &&
          props.posts.map(post => (
            <PostItem key={post.id} post={post} style={spring} />
          ))}
        {props.posts.length && props.posts && filteredPosts.length === 0 ? (
          <StyledNoResults>
            No articles have been posted about {currentFilter}. Be the{' '}
            <Link href="/publish">
              <a>first</a>
            </Link>
            !
          </StyledNoResults>
        ) : null}
      </StyledPosts>
      <Pagination
        pages={pages()}
        totalPosts={props.totalPosts}
        totalPages={props.totalPages}
        postCount={props.postCount}
        postsLength={props.posts.length}
        setPage={setPage}
        page={page}
      />
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
  filterTaxonomy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedPosts);
