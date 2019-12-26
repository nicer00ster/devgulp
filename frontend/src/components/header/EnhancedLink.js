import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { StyledMenuItem } from './header.styles';
import { StyledDrawerItem } from './drawer/drawer.styles';
import { toggleDrawer } from '../../redux/actions';
import Tooltip from '../kit/tooltip';

function EnhancedLink({
  children,
  href,
  screenWidth,
  toggleDrawer,
  isAuthenticated,
  isButton,
  onClick,
}) {
  const router = useRouter();
  let activeClass = router.pathname === href ? 'active-route' : '';

  function handleClick(e) {
    e.preventDefault();
    if (
      href === '/publish' ||
      (href === '/users' && !isAuthenticated) ||
      isButton
    ) {
      return;
    }
    if (screenWidth <= 576) {
      toggleDrawer();
    }
    router.push(href);
  }

  if (isButton) {
    return (
      <StyledDrawerItem onClick={onClick} isAuthenticated={isAuthenticated}>
        <button>{children}</button>
      </StyledDrawerItem>
    );
  }

  if (screenWidth <= 576) {
    return (
      <StyledDrawerItem isAuthenticated={isAuthenticated} onClick={handleClick}>
        <Link scroll={false} prefetch href={href}>
          <a className={activeClass}>{children}</a>
        </Link>
      </StyledDrawerItem>
    );
  }
  return (
    <StyledMenuItem
      data-tooltip
      isAuthenticated={isAuthenticated}
      onClick={handleClick}>
      {!isAuthenticated && <Tooltip content="Sign in to view this page!" />}
      <Link scroll={false} prefetch href={href}>
        <a className={activeClass}>{children}</a>
      </Link>
    </StyledMenuItem>
  );
}

const mapStateToProps = ({ root }) => ({
  screenWidth: root.screenWidth,
});

const mapDispatchToProps = {
  toggleDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedLink);
