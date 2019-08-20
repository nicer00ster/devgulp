import { connect } from 'react-redux';
import {
    StyledDrawer,
    StyledDrawerList,
    StyledDrawerUser,
} from './drawer.styles';
import {
    StyledAvatar
} from "../../header/header.styles";
import {
    StyledUserDataListItem,
    StyledUserInfo,
} from "../../kit/userMenu/userMenu.styles";
import EnhancedLink from "../EnhancedLink";
import Link from "next/link";
import { toggleDrawer } from "../../../redux/actions";

function Drawer(props) {
    return (
        <StyledDrawer drawerOpen={props.drawerOpen}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <StyledDrawerUser>
                <StyledUserDataListItem>
                    <StyledAvatar size={52}>
                        <Link href={`/user?userId=${props.user.id}`}>
                            <a onClick={props.toggleDrawer}>
                                <img
                                    src={
                                        !props.user.avatar
                                            ? "/static/icons/default_avatar.png"
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
            </StyledDrawerUser>
            <StyledDrawerList>
                <EnhancedLink href='/publish'>Publish</EnhancedLink>
                <EnhancedLink href='/users'>Users</EnhancedLink>
            </StyledDrawerList>
            </div>
        </StyledDrawer>
    );
}

const mapStateToProps = ({ root, user }) => ({
    user,
    drawerOpen: root.drawerOpen,
});

const mapDispatchToProps = {
  toggleDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
