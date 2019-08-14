import { connect } from "react-redux";
import { useTrail } from "react-spring";
import {
  StyledUserMenu,
  StyledUserMenuList,
  StyledUserMenuListItem,
  StyledUserDataListItem,
  StyledUserInfo,
  StyledUserMenuCaret,
  StyledUserMenuDivider
} from "./userMenu.styles";
import { StyledAvatar } from "../../header/header.styles";
import Loading from "../loading";
import { logout } from "../../../redux/actions";

const config = { mass: 5, tension: 2000, friction: 100 };

function UserMenu(props) {
  const trail = useTrail(1, {
    config,
    opacity: props.userMenuOpen ? 1 : 0,
    x: props.userMenuOpen ? 0 : 20,
    height: props.userMenuOpen ? 80 : 0,
    pointerEvents: props.userMenuOpen ? "all" : "none",
    from: {
      opacity: 0,
      x: 20,
      height: 0
    }
  });

  return trail.map(({ x, height, ...rest }, index) => (
    <StyledUserMenu
      key={index}
      style={{
        ...rest,
        transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
      }}
      disabled={!props.userMenuOpen || props.user.isLoggingOut}
    >
      <StyledUserMenuList>
        <StyledUserDataListItem>
          <StyledAvatar size={52}>
            <img
              src={
                !props.user.avatar
                  ? "/static/icons/default_avatar.png"
                  : props.user.avatar
              }
              alt={props.user.username}
            />
          </StyledAvatar>
          <StyledUserInfo>
            <span>{props.user.username}</span>
            <span>{props.user.email}</span>
          </StyledUserInfo>
        </StyledUserDataListItem>
        <StyledUserMenuDivider />
        <StyledUserMenuListItem>More</StyledUserMenuListItem>
        <StyledUserMenuDivider />
        <StyledUserMenuListItem>
          <button onClick={() => props.logout()}>logout</button>
        </StyledUserMenuListItem>
      </StyledUserMenuList>
      <StyledUserMenuCaret />
      {props.user.isLoggingOut && <Loading />}
    </StyledUserMenu>
  ));
}

const mapStateToProps = ({ root, user }) => ({
  userMenuOpen: root.userMenuOpen,
  user
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
