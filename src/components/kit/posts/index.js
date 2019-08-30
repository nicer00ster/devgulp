import { useState, useEffect } from 'react';
import { useTransition } from 'react-spring';
import Link from 'next/link';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
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

function EnhancedPosts(props) {
  const [activeFilter, setActiveFilter] = useState(1);
  const filteredPosts = props.posts.filter(post => post.isFiltered);
  const currentFilter = props.categories.map(category =>
    category.id === props.taxonomyFilter ? category.name : null,
  );

  function handleFilter(id) {
    setActiveFilter(id);
    props.filterTaxonomy(id);
  }

  const fetchPosts = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    if (props.postCount >= props.totalPosts) return;
    props.fetchPosts(props.postCount + 2);
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', fetchPosts);
    return () => window.removeEventListener('scroll', fetchPosts);
  }, [fetchPosts]);

  const transitions = useTransition(props.posts, post => post.id, {
    config: {
      duration: 100,
    },
    trail: 25,
    from: { opacity: 0, transform: `translateY(100px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(100px)` },
    update: item => ({
      opacity: item.isFiltered ? 1 : 0,
      transform: item.isFiltered ? `translateY(0)` : `translateY(100px)`,
    }),
  });

  return (
    <StyledPostsContainer>
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
      <StyledPosts>
        {props.posts &&
          transitions.map(
            post =>
              post.item.isFiltered && (
                <PostItem
                  key={post.item.id}
                  post={post.item}
                  opacity={post.props.opacity}
                  transform={post.props.transform}
                />
              ),
          )}
      </StyledPosts>
      {props.posts.length && props.posts && filteredPosts.length === 0 ? (
        <StyledNoResults>
          No articles have been posted about {currentFilter}. Be the{' '}
          <Link href="/publish">
            <a>first</a>
          </Link>
          !
        </StyledNoResults>
      ) : null}
    </StyledPostsContainer>
  );
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  categories: posts.categories,
  taxonomyFilter: posts.taxonomyFilter,
  postCount: posts.postCount,
  isFetchingPosts: posts.isFetchingPosts,
  totalPosts: posts.totalPosts,
});

const mapDispatchToProps = {
  fetchPosts,
  filterTaxonomy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedPosts);
