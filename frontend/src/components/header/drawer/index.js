import { connect } from 'react-redux';
import Link from 'next/link';
import { StyledDrawer, StyledDrawerList, StyledDrawerUser } from './drawer.styles';
import { StyledAvatar } from '../../header/header.styles';
import {
  StyledLogoutButton,
  StyledUserDataListItem,
  StyledUserInfo,
} from '../../kit/userMenu/userMenu.styles';
import {
  toggleDrawer,
  toggleLoginMenu,
  closeDrawer,
  logout,
} from '../../../redux/actions';
import EnhancedLink from '../EnhancedLink';
import DrawerLogin from './DrawerLogin';
import Loading from '../../kit/loading';

function Drawer(props) {
  return (
    <StyledDrawer
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
              onClick={() => props.logout(props.user.token)}>
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
      {!props.user.token && <DrawerLogin />}
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
