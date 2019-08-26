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
} from './singleUser.styles';
import { StyledAvatar } from '../../header/header.styles';
import { toggleModal } from '../../../redux/actions';
import EditProfile from './editProfile';
import Loading from '../loading';
import Modal from '../modal';
import Editor from '../editor';
import { StyledPreviewImage } from '../publish/publish.styles';

function SingleUser(props) {
  const { author, isFetchingAuthor } = props.author;
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleUser);
