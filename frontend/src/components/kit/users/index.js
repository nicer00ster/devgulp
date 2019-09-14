import Link from 'next/link';
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
              href="/user/[id]"
              as={`/user/${props.users[index].id}`}>
              <a>
                <StyledAvatar
                  tabIndex="-1"
                  aria-label={props.users[index].name}
                  size={72}>
                  <img
                    alt="Avatar"
                    src={
                      !props.users[index].avatar
                        ? '/static/images/default_avatar.png'
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

export default EnhancedUsers;
