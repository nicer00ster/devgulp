import { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSpring } from 'react-spring';
import NProgress from 'nprogress';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import Modal from '../kit/modal';
import Form from '../kit/form';
import {
  StyledHeader,
  StyledNav,
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
  toggleSignUpMenu,
  toggleUserMenu,
  toggleSearch,
  toggleDonationMenu,
  searchQuery,
  filterTaxonomy,
  closeDrawer,
} from '../../redux/actions';
import { useOnClickOutside, useMeasure, useInput } from '../../hooks';
import EnhancedLink from './EnhancedLink';
import Tooltip from '../kit/tooltip';
import Stripe from '../kit/stripe';
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
  const donationRef = useRef();
  const [bind, { width }] = useMeasure();
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
    if (props.drawerOpen) {
      props.closeDrawer();
    }
    if (props.donationMenuOpen) {
      props.toggleDonationMenu();
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    console.log(props.userMenuOpen);

    searchRef.current.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        props.toggleSearch();
        searchRef.current.blur();
      }
    });

    donationRef.current.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        props.toggleDonationMenu();
        donationRef.current.blur();
      }
    });

    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  const spring = useSpring({
    width: props.searchExpanded ? '100%' : '0%',
    opacity: props.searchExpanded ? 1 : 0,
    flex: props.searchExpanded ? 1 : 0,
  });

  const logoSpring = useSpring({
    opacity: isScrolled ? 1 : 0.75,
    transform:
      props.screenWidth <= 576 || isScrolled
        ? 'translate3d(0px,0px,0px)'
        : `translate3d(${width / 2 - 56}px, 40px, 0px)`,
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
            <StyledLogo
              loginMenuOpen={props.loginMenuOpen}
              userMenuOpen={props.userMenuOpen}
              drawerOpen={props.drawerOpen}
              href="#"
              style={logoSpring}
              isScrolled={isScrolled}>
              <img src="/static/devgulp-logo.svg" alt="DevGulp" />
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
                  props.searchExpanded && toggleSearch();
                } else {
                  props.searchQuery(query);
                  props.searchExpanded && toggleSearch();
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
          <StyledMenuItem ref={donationRef} data-tooltip>
            <Stripe>
              <i className="fal fa-donate" />
            </Stripe>
            {!props.donationMenuOpen ? (
              <Tooltip content="Help us continue delivering new features!" />
            ) : null}
          </StyledMenuItem>
          {props.screenWidth <= 576 ? (
            <Burger />
          ) : (
            <>
              <EnhancedLink
                href="/publish"
                isAuthenticated={props.user.isAuthenticated}>
                Publish
              </EnhancedLink>
              <EnhancedLink
                href="/users"
                isAuthenticated={props.user.isAuthenticated}>
                Users
              </EnhancedLink>
              {!props.user.token ? (
                <>
                  <StyledMenuItem>
                    <StyledSignup onClick={() => props.toggleSignUpMenu()}>
                      Sign Up
                    </StyledSignup>
                  </StyledMenuItem>
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
                          ? '/static/images/default_avatar.png'
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
      {props.screenWidth >= 578 && (
        <>
          <Login />
          <UserMenu />
        </>
      )}
      {!props.user.isAuthenticated && (
        <Modal noPadding={true} width={400}>
          <Form />
        </Modal>
      )}
    </StyledHeader>
  );
}

const mapStateToProps = ({ root, posts, user }) => ({
  loginMenuOpen: root.loginMenuOpen,
  signUpMenuOpen: root.signUpMenuOpen,
  userMenuOpen: root.userMenuOpen,
  drawerOpen: root.drawerOpen,
  donationMenuOpen: root.donationMenuOpen,
  filterTaxonomy: root.filterTaxonomy,
  searchExpanded: root.searchExpanded,
  screenWidth: root.screenWidth,
  categories: posts.categories,
  modalOpen: root.modalOpen,
  user,
});

const mapDispatchToProps = {
  toggleLoginMenu,
  toggleSignUpMenu,
  toggleUserMenu,
  toggleSearch,
  toggleDonationMenu,
  searchQuery,
  filterTaxonomy,
  closeDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
