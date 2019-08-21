import { useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  StyledDrawer,
  StyledDrawerList,
  StyledDrawerUser,
} from './drawer.styles';
import {
  StyledAvatar,
  StyledLogin,
  StyledMenuItem,
} from '../../header/header.styles';
import {
  StyledLogoutButton,
  StyledUserDataListItem,
  StyledUserInfo,
  StyledUserMenuList,
  StyledUserMenuListItem,
} from '../../kit/userMenu/userMenu.styles';
import {
  toggleDrawer,
  toggleLoginMenu,
  closeDrawer,
  logout,
} from '../../../redux/actions';
import { useOnClickOutside } from '../../../hooks';
import EnhancedLink from '../EnhancedLink';
import DrawerLogin from './DrawerLogin';
import Loading from '../../kit/loading';

function Drawer(props) {
  const ref = useRef();
  useOnClickOutside(ref, e => {
    if (props.drawerOpen) {
      props.closeDrawer();
    }
  });
  return (
    <StyledDrawer
      ref={ref}
      isLoggingOut={props.isLoggingOut}
      isLoggingIn={props.isLoggingIn}
      drawerOpen={props.drawerOpen}>
      <StyledDrawerUser>
        {props.user.token && (
          <>
            <StyledUserDataListItem>
              <StyledAvatar size={52}>
                <Link href={`/user?userId=${props.user.id}`}>
                  <a onClick={props.closeDrawer}>
                    <img
                      src={
                        !props.user.avatar
                          ? '/static/icons/default_avatar.png'
                          : props.user.avatar
                      }
                      alt={props.user.username}
                    />
                  </a>
                </Link>
              </StyledAvatar>
              <StyledUserInfo>
                <span>{props.user.username}</span>
                <span>{props.user.email}</span>
              </StyledUserInfo>
            </StyledUserDataListItem>
            <StyledLogoutButton
              style={{ padding: '1.2rem' }}
              onClick={() => props.logout()}>
              Sign out
            </StyledLogoutButton>
          </>
        )}
      </StyledDrawerUser>
      <StyledDrawerList>
        <EnhancedLink href="/publish">Publish</EnhancedLink>
        <EnhancedLink href="/users">Users</EnhancedLink>
      </StyledDrawerList>
      {props.isLoggingIn || props.isLoggingOut ? <Loading /> : null}
      {!props.user.token && <DrawerLogin /> }
    </StyledDrawer>
  );
}

const mapStateToProps = ({ root, user }) => ({
  user,
  drawerOpen: root.drawerOpen,
  isLoggingOut: user.isLoggingOut,
  isLoggingIn: user.isLoggingIn,
});

const mapDispatchToProps = {
  toggleDrawer,
  toggleLoginMenu,
  logout,
  closeDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);