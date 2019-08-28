import { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyledFollowers } from './followers.styles';
import { fetchUserFollowers } from '../../../redux/actions';
import EnhancedUsers from '../users';
import Loading from '../loading';
import { StyledDivider } from "../globals/globals.styles";

function Followers(props) {
  useEffect(() => {
    props.fetchUserFollowers(props.followerIds);
  }, []);

  if(props.isFetchingFollowers) {
    return <Loading />
  }
  return (
    <StyledFollowers>
      <p>Followers</p>
      <StyledDivider />
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
