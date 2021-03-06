import React, { useState, useEffect } from 'react';
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
  StyledSingleUserWebsite,
  StyledSingleUserFollowers,
  StyledSingleUserAvatar,
  StyledSingleUserAvatarUpload,
  StyledSingleUserPosts,
} from './singleUser.styles';
import { StyledPosts, StyledNoResults } from '../posts/posts.styles';
import { StyledAvatar } from '../../header/header.styles';
import { StyledPreviewImage } from '../publish/publish.styles';
import { StyledDivider } from '../globals/globals.styles';
import { ALLOWED_MIME_TYPES } from '../../../redux/constants';
import {
  toggleModal,
  followUnfollowUser,
  uploadAvatar,
} from '../../../redux/actions';
import EditProfile from './editProfile';
import Followers from '../followers';
import Loading from '../loading';
import Modal from '../modal';
import Button from '../button';
import Achievements from '../achievements';
import PostItem from '../posts/PostItem';

function SingleUser(props) {
  const {
    author,
    posts,
    fetchedFollowers,
    isFetchingFollowers,
    isFetchingAuthor,
    isUpdatingUser,
    isUploadingAvatar,
  } = props.author;
  const [isUsersProfile, setIsUsersProfile] = useState(false);

  useEffect(() => {
    if (author.id === props.user.id) {
      setIsUsersProfile(true);
    } else {
      setIsUsersProfile(false);
    }
  }, [author.id, props.user.id]);

  async function handleImage(e) {
    const files = e.target.files;
    const data = new FormData();

    // Validate MIME type
    if (ALLOWED_MIME_TYPES.indexOf(files[0].type) == -1) {
      return new Error('File type not allowed.');
    } else {
      data.append('file', files[0]);
    }
    return data;
  }

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
            <Achievements size={36} user={author} />
            {author.description && (
              <StyledSingleUserDescription>
                <blockquote>{author.description}</blockquote>
              </StyledSingleUserDescription>
            )}
            <StyledSingleUserEmail>
              <i className="fal fa-at" />
              <span>{author.user_email}</span>
            </StyledSingleUserEmail>
            {author.url && (
              <StyledSingleUserWebsite>
                <i className="fal fa-link" />
                <a href={author.url} target="_blank">
                  {author.url}
                </a>
              </StyledSingleUserWebsite>
            )}
            {author.company_name && (
              <StyledSingleUserCompany>
                <i className="fal fa-building" />
                <span>{author.company_name}</span>
              </StyledSingleUserCompany>
            )}
            <StyledSingleUserFollowers>
              <i className="fal fa-user" />
              <span>
                {author.acf.user_followers.length} follower
                {author.acf.user_followers.length !== 1 ? 's' : ''}
              </span>
            </StyledSingleUserFollowers>
            {!isUsersProfile && (
              <Button
                disabled={!props.user.token}
                onClick={() =>
                  props.followUnfollowUser(
                    props.user.token,
                    props.user.id,
                    author.id,
                    author.acf.user_followers,
                  )
                }
                style={{ marginTop: '12px' }}>
                {author.acf.user_followers.includes(props.user.id)
                  ? `Unfollow${isUpdatingUser ? 'ing' : ''}`
                  : `Follow${isUpdatingUser ? 'ing' : ''}`}
              </Button>
            )}
          </StyledSingleUserInfo>
          <StyledSingleUserAvatar isUploadingAvatar={isUploadingAvatar}>
            <StyledAvatar
              size={100}
              className="bordered"
              aria-label={`View ${author.name}'s avatar.`}
              onClick={() => {
                if (!author.acf.avatar) return;
                props.toggleModal();
              }}>
              <img
                alt="Avatar"
                src={
                  !author.acf.avatar
                    ? '/static/images/default_avatar.png'
                    : author.acf.avatar
                }
              />
              {isUploadingAvatar && <Loading />}
            </StyledAvatar>
            {isUsersProfile && (
              <>
                <StyledSingleUserAvatarUpload
                  onChange={e =>
                    props.uploadAvatar(props.user.token, handleImage(e))
                  }
                  aria-label="Upload Avatar"
                  className="upload-avatar"
                  type="file"
                  name="file"
                  id="upload-avatar"
                  accept="image/*"
                />
                <label htmlFor="upload-avatar">Upload Avatar</label>
              </>
            )}
          </StyledSingleUserAvatar>
        </StyledSingleUserContent>
        {author.acf.user_followers.length ? (
          <Followers
            isFetchingFollowers={isFetchingFollowers}
            followerIds={author.acf.user_followers}
            followers={fetchedFollowers}
          />
        ) : null}
        <StyledSingleUserPosts>
          <p>{author.name}'s posts</p>
          <StyledDivider />
          <StyledPosts columns={2} className={!posts.length ? 'no-results' : ''}>
            {posts &&
              posts.map(post => (
                <PostItem className="flatten" key={post.id} post={post} />
              ))}
            {!posts.length && (
              <StyledNoResults>
                {isUsersProfile ? 'You have ' : `${author.name} has `} not
                published any stories yet.
              </StyledNoResults>
            )}
          </StyledPosts>
        </StyledSingleUserPosts>
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
  uploadAvatar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleUser);
