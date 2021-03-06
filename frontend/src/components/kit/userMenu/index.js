import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useTrail } from 'react-spring';
import {
  StyledUserMenu,
  StyledUserMenuList,
  StyledUserMenuListItem,
  StyledUserDataListItem,
  StyledUserInfo,
  StyledUserMenuCaret,
  StyledUserMenuDivider,
  StyledLogoutButton,
} from './userMenu.styles';
import { StyledAvatar } from '../../header/header.styles';
import Loading from '../loading';
import { logout, toggleUserMenu } from '../../../redux/actions';

const config = { mass: 5, tension: 2000, friction: 100 };

function UserMenu(props) {
  const trail = useTrail(1, {
    config,
    opacity: props.userMenuOpen ? 1 : 0,
    x: props.userMenuOpen ? 5 : 20,
    height: props.userMenuOpen ? 80 : 0,
    pointerEvents: props.userMenuOpen ? 'all' : 'none',
    from: {
      opacity: 0,
      x: 20,
      height: 0,
    },
  });

  const router = useRouter();

  function handleLogout() {
    props.logout(props.user.token);
    router.push('/');
  }

  return trail.map(({ x, height, opacity, ...rest }, index) => (
    <StyledUserMenu
      ref={props.userMenuRef}
      key={index}
      disabled={!props.userMenuOpen || props.user.isLoggingOut}
      style={{
        transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
        opacity: !props.user.isLoggingOut && opacity,
        ...rest,
      }}>
      {props.userMenuOpen && (
        <StyledUserMenuList>
          <StyledUserDataListItem>
            <StyledAvatar autoFocus={true} size={52}>
              <Link href="/user/[id]" as={`/user/${props.user.id}`}>
                <a onClick={props.toggleUserMenu}>
                  <img
                    src={
                      !props.user.avatar
                        ? '/static/images/default_avatar.png'
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
          <StyledUserMenuDivider />
          <StyledUserMenuListItem>
            <Link href="/publish">
              <a onClick={props.toggleUserMenu}>
                <i className="fal fa-feather-alt" />
                New Post
              </a>
            </Link>
          </StyledUserMenuListItem>
          <StyledUserMenuListItem>
            <Link href="/users">
              <a onClick={props.toggleUserMenu}>
                <i className="fal fa-users" />
                Users
              </a>
            </Link>
          </StyledUserMenuListItem>
          <StyledUserMenuDivider />
          <StyledUserMenuListItem>
            <Link href="/user/[id]" as={`/user/${props.user.id}`}>
              <a onClick={props.toggleUserMenu}>
                <i className="fal fa-user" />
                Profile
              </a>
            </Link>
          </StyledUserMenuListItem>
          <StyledUserMenuListItem>
            <Link href="/user/[id]" as={`/user/${props.user.id}`}>
              <a onClick={props.toggleUserMenu}>
                <i className="fal fa-cogs" />
                Settings
              </a>
            </Link>
          </StyledUserMenuListItem>
          <StyledUserMenuListItem>
            <Link href="/help">
              <a onClick={props.toggleUserMenu}>
                <i className="fal fa-life-ring" />
                Help
              </a>
            </Link>
          </StyledUserMenuListItem>
          <StyledUserMenuDivider />
          <StyledUserMenuListItem>
            <StyledLogoutButton onClick={handleLogout}>
              Sign out
            </StyledLogoutButton>
          </StyledUserMenuListItem>
        </StyledUserMenuList>
      )}
      <StyledUserMenuCaret />
      {props.user.isLoggingOut && <Loading />}
    </StyledUserMenu>
  ));
}

const mapStateToProps = ({ root, user }) => ({
  userMenuOpen: root.userMenuOpen,
  user,
});

const mapDispatchToProps = {
  logout,
  toggleUserMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMenu);
