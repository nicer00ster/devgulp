import { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSpring } from 'react-spring';
import NProgress from 'nprogress';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import {
  StyledHeader,
  StyledNav,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
  StyledCategoryCount,
  StyledLogin,
  StyledSignup,
  StyledLogoContainer,
  StyledLogo,
  StyledMenu,
  StyledMenuItem,
  StyledAvatar,
  StyledSearch,
  StyledSearchInput,
} from './header.styles';
import {
  toggleLoginMenu,
  toggleUserMenu,
  toggleSearch,
  searchQuery,
  filterTaxonomy,
} from '../../redux/actions';
import { useOnClickOutside, useMeasure, useInput } from '../../hooks';
import EnhancedLink from './EnhancedLink';
import Login from '../kit/login';
import Burger from '../kit/burger';
import Drawer from './drawer';
import UserMenu from '../kit/userMenu';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

function Header(props) {
  const ref = useRef();
  const searchRef = useRef();
  const [bind, { width }] = useMeasure();
  const [activeFilter, setActiveFilter] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    value: query,
    bind: bindQuery,
    reset: resetQuery,
    setError: setQueryError,
    hasError: queryError,
  } = useInput('');

  const handleWindowScroll = useCallback(e => {
    if (window.scrollY >= ref.current.offsetHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  function handleFilter(id) {
    setActiveFilter(id);
    props.filterTaxonomy(id);
  }

  function toggleSearch() {
    props.toggleSearch();
    if (props.searchExpanded) {
      searchRef.current.blur();
    } else {
      searchRef.current.focus();
    }
  }

  useOnClickOutside(ref, () => {
    if (props.userMenuOpen) {
      props.toggleUserMenu();
    }
    if (props.loginMenuOpen) {
      props.toggleLoginMenu();
    }
    if (props.searchExpanded) {
      props.toggleSearch();
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  const spring = useSpring({
    width: props.searchExpanded ? '100%' : '0%',
    opacity: props.searchExpanded ? 1 : 0,
    flex: props.searchExpanded ? 1 : 0,
  });

  const logoSpring = useSpring({
    transform: isScrolled
      ? 'translate3d(0px,0px,0px)'
      : `translate3d(${width / 2 - 24}px, 40px, 0px)`,
  });

  return (
    <StyledHeader ref={ref} className={isScrolled ? 'is-scrolled' : ''}>
      <StyledNav
        {...bind}
        loginMenuOpen={props.loginMenuOpen}
        userMenuOpen={props.userMenuOpen}>
        {props.screenWidth <= 576 && <Drawer />}
        <StyledLogoContainer>
          <Link href="/" prefetch scroll={false}>
            <StyledLogo href="#" style={logoSpring}>
              DevGulp
            </StyledLogo>
          </Link>
        </StyledLogoContainer>
        <StyledMenu>
          <StyledMenuItem>
            <StyledSearch onClick={toggleSearch}>
              <i className="fal fa-search" />
            </StyledSearch>
          </StyledMenuItem>
          <StyledSearchInput style={spring}>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (props.router.pathname !== '/search') {
                  props.searchQuery(query);
                  props.router.push(`/search`);
                } else {
                  props.searchQuery(query);
                }
                resetQuery();
              }}>
              <input
                ref={searchRef}
                {...bindQuery}
                tabIndex="-1"
                type="text"
                name="search"
                id="search"
              />
              <label htmlFor="search" />
              <span className="bar" />
            </form>
          </StyledSearchInput>
          {props.screenWidth <= 576 ? (
            <Burger />
          ) : (
            <>
              <EnhancedLink href="/publish">Publish</EnhancedLink>
              <EnhancedLink href="/users">Users</EnhancedLink>
              {!props.user.token ? (
                <>
                  <StyledSignup>
                    <Link scroll={false} prefetch href="/register">
                      <a>Sign Up</a>
                    </Link>
                  </StyledSignup>
                  <StyledMenuItem>
                    <StyledLogin onClick={() => props.toggleLoginMenu()}>
                      Login
                    </StyledLogin>
                  </StyledMenuItem>
                </>
              ) : (
                <StyledMenuItem>
                  <StyledAvatar onClick={() => props.toggleUserMenu()}>
                    <img
                      alt="Avatar"
                      src={
                        !props.user.avatar
                          ? '/static/icons/default_avatar.png'
                          : props.user.avatar
                      }
                    />
                  </StyledAvatar>
                </StyledMenuItem>
              )}
            </>
          )}
        </StyledMenu>
      </StyledNav>
      {props.router.pathname === '/' && (
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
      )}
      {props.screenWidth >= 578 && (
        <>
          <Login />
          <UserMenu />
        </>
      )}
    </StyledHeader>
  );
}

const mapStateToProps = ({ root, posts, user }) => ({
  loginMenuOpen: root.loginMenuOpen,
  userMenuOpen: root.userMenuOpen,
  filterTaxonomy: root.filterTaxonomy,
  searchExpanded: root.searchExpanded,
  screenWidth: root.screenWidth,
  categories: posts.categories,
  drawerOpen: root.drawerOpen,
  user,
});

const mapDispatchToProps = {
  toggleLoginMenu,
  toggleUserMenu,
  toggleSearch,
  searchQuery,
  filterTaxonomy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
