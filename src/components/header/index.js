import { useState, useRef } from "react";
import { connect } from "react-redux";
import NProgress from "nprogress";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import {
  StyledHeader,
  StyledNav,
  StyledFilterNav,
  StyledFilterItems,
  StyledFilterItem,
  StyledCategoryCount,
  StyledLogin,
  StyledSignup,
  StyledLogo,
  StyledMenu,
  StyledAvatar
} from "./header.styles";
import EnhancedLink from "./EnhancedLink";
import Login from "../kit/login";
import UserMenu from "../kit/userMenu";
import Loading from "../kit/loading";
import { useOnClickOutside } from "../../hooks";
import {
  toggleLoginMenu,
  toggleUserMenu,
  filterTaxonomy
} from "../../redux/actions";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

function Header(props) {
  const ref = useRef();
  const [activeFilter, setActiveFilter] = useState(1);

  useOnClickOutside(ref, () => {
    if (props.userMenuOpen) {
      props.toggleUserMenu();
    }
    if (props.loginMenuOpen) {
      props.toggleLoginMenu();
    }
  });

  function handleFilter(id) {
    setActiveFilter(id);
    props.filterTaxonomy(id);
  }

  return (
    <StyledHeader ref={ref}>
      <StyledNav
        loginMenuOpen={props.loginMenuOpen}
        userMenuOpen={props.userMenuOpen}>
        <StyledLogo>
          <Link href="/" prefetch scroll={false}>
            <a>DevGulp</a>
          </Link>
        </StyledLogo>
        <StyledMenu>
          <EnhancedLink href="/publish">Publish</EnhancedLink>
          <EnhancedLink href="/users">Users</EnhancedLink>
          {!props.user.token ? (
            <>
              <StyledSignup>
                <Link scroll={false} prefetch href="/register">
                  <a>Sign Up</a>
                </Link>
              </StyledSignup>
              <StyledLogin onClick={() => props.toggleLoginMenu()}>
                Login
              </StyledLogin>
            </>
          ) : (
            <StyledAvatar onClick={() => props.toggleUserMenu()}>
              <img
                alt="Avatar"
                src={
                  !props.user.avatar
                    ? "/static/icons/default_avatar.png"
                    : props.user.avatar
                }
              />
            </StyledAvatar>
          )}
        </StyledMenu>
      </StyledNav>
      {props.router.pathname === "/" && (
        <StyledFilterNav
          loginMenuOpen={props.loginMenuOpen}
          userMenuOpen={props.userMenuOpen}>
          <StyledFilterItems>
            {props.categories &&
              props.categories.map(category => (
                <StyledFilterItem
                  key={category.id}
                  className={activeFilter === category.id && "active-filter"}
                  onClick={() => handleFilter(category.id)}
                >
                  {category.name === "Uncategorized" ? "All" : category.name}
                  <StyledCategoryCount>{category.count}</StyledCategoryCount>
                </StyledFilterItem>
              ))}
          </StyledFilterItems>
        </StyledFilterNav>
      )}
      <Login />
      <UserMenu />
    </StyledHeader>
  );
}

const mapStateToProps = ({ root, posts, user }) => ({
  loginMenuOpen: root.loginMenuOpen,
  userMenuOpen: root.userMenuOpen,
  filterTaxonomy: root.filterTaxonomy,
  categories: posts.categories,
  user
});

const mapDispatchToProps = {
  toggleLoginMenu,
  toggleUserMenu,
  filterTaxonomy
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(withRouter(Header));
