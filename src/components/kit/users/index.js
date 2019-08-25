import Link from 'next/link';
import { connect } from 'react-redux';
import { useTrail, config } from 'react-spring';
import { StyledUsers, StyledUser } from './users.styles';
import { StyledAvatar } from '../../header/header.styles';

function EnhancedUsers(props) {
  const trail = useTrail(props.users.length, {
    config: config.stiff,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: -20 },
  });

  return (
    <StyledUsers>
      {props.users &&
        trail.map(({ x, ...rest }, index) => (
          <StyledUser
            key={props.users[index].id}
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
            }}>
            <Link
              key={props.users[index].id}
              href={`/user?userId=${props.users[index].id}`}>
              <a>
                <StyledAvatar tabIndex="-1" size={72}>
                  <img
                    alt="Avatar"
                    src={
                      !props.users[index].avatar
                        ? '/static/icons/default_avatar.png'
                        : props.users[index].avatar
                    }
                  />
                </StyledAvatar>
              </a>
            </Link>
          </StyledUser>
        ))}
    </StyledUsers>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

export default connect(
  mapStateToProps,
  null,
)(EnhancedUsers);
