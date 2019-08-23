import Link from 'next/link';
import {connect} from 'react-redux';
import {StyledUser, StyledUsers} from './users.styles';

function EnhancedUsers(props) {
    return (
        <StyledUsers>
            {props.users &&
            props.users.map(user => (
                <Link key={user.id} href={`/user?userId=${user.id}`}>
                    <a>
                        <StyledUser key={user.id}>{user.name}</StyledUser>
                    </a>
                </Link>
            ))}
        </StyledUsers>
    );
}

const mapStateToProps = ({users}) => ({
    ...users,
});

export default connect(
    mapStateToProps,
    null,
)(EnhancedUsers);
