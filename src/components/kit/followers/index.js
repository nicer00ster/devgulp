import { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyledFollowers } from './followers.styles';
import EnhancedUsers from '../users';
import { fetchUserFollowers } from '../../../redux/actions';

function Followers(props) {
  useEffect(() => {
    props.fetchUserFollowers(props.followerIds);
  }, []);
  return (
    <StyledFollowers>
      <EnhancedUsers users={props.followers} />
    </StyledFollowers>
  );
}

const mapDispatchToProps = {
  fetchUserFollowers,
};

export default connect(
  null,
  mapDispatchToProps,
)(Followers);
