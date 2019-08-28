import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  StyledSingleUser,
  StyledSingleUserContainer,
  StyledSingleUserInfo,
  StyledSingleUserContent,
  StyledSingleUserName,
  StyledSingleUserDate,
  StyledSingleUserDescription,
  StyledSingleUserCompany,
  StyledSingleUserEmail,
  StyledSingleUserFollowers,
} from './singleUser.styles';
import { StyledAvatar } from '../../header/header.styles';
import { StyledPreviewImage } from '../publish/publish.styles';
import { toggleModal, followUnfollowUser } from '../../../redux/actions';
import EditProfile from './editProfile';
import Followers from '../followers';
import Loading from '../loading';
import Modal from '../modal';
import Button from '../button';

function SingleUser(props) {
  const { author, fetchedFollowers, isFetchingFollowers, isFetchingAuthor, isUpdatingUser } = props.author;
  const [isUsersProfile, setIsUsersProfile] = useState(false);

  useEffect(() => {
    if (author.id === props.user.id) {
      setIsUsersProfile(true);
    } else {
      setIsUsersProfile(false);
    }
  }, [author.id, props.user.id]);

  if (isFetchingAuthor) {
    return <Loading />;
  }
  return (
    <StyledSingleUser>
      <StyledSingleUserContainer>
        <StyledSingleUserContent>
          <StyledSingleUserInfo>
            <StyledSingleUserName>{author.name}</StyledSingleUserName>
            <StyledSingleUserDate>
              Active user since
              {` `}
              {moment(author.user_registered).format('MMMM Do, YYYY')}
            </StyledSingleUserDate>
            {author.description && (
              <StyledSingleUserDescription>
                <blockquote>{author.description}</blockquote>
              </StyledSingleUserDescription>
            )}
            <StyledSingleUserEmail>
              <i className="fal fa-at" />
              <span>{author.user_email}</span>
            </StyledSingleUserEmail>
            {author.company_name && (
              <StyledSingleUserCompany>
                <i className="fal fa-building" />
                <span>{author.company_name}</span>
              </StyledSingleUserCompany>
            )}
            <StyledSingleUserFollowers>
              <i className="fal fa-user" />
              <span>{author.acf.user_followers.length} follower{author.acf.user_followers.length !== 1 ? 's' : ''}</span>
            </StyledSingleUserFollowers>
            {!isUsersProfile && (
              <Button
                  onClick={() => props.followUnfollowUser(props.user.token, props.user.id, author.id, author.acf.user_followers)}
                  style={{ marginTop: '12px' }}>
                {author.acf.user_followers.includes(props.user.id) ? `Unfollow${isUpdatingUser ? 'ing' : ''}`: `Follow${isUpdatingUser ? 'ing' : ''}`}
              </Button>
            )}
          </StyledSingleUserInfo>
          <StyledAvatar
            size={100}
            className="bordered"
            onClick={props.toggleModal}>
            <img
              alt="Avatar"
              src={
                !author.acf.avatar
                  ? '/static/icons/default_avatar.png'
                  : author.acf.avatar
              }
            />
          </StyledAvatar>
        </StyledSingleUserContent>
        {author.acf.user_followers.length ? (
          <Followers
            isFetchingFollowers={isFetchingFollowers}
            followerIds={author.acf.user_followers}
            followers={fetchedFollowers}
          />
        ) : null}
        {isUsersProfile && <EditProfile user={author} />}
      </StyledSingleUserContainer>
      <Modal>
        <StyledPreviewImage src={author.acf.avatar} />
      </Modal>
    </StyledSingleUser>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  toggleModal,
  followUnfollowUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleUser);
