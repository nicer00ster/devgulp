import { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  StyledComment,
  StyledCommentAuthor,
  StyledCommentAuthorDate,
  StyledCommentContainer,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentReplyTo,
  StyledCommentReplyToInput,
  StyledCommentUserData,
} from './comments.styles';
import { StyledComments } from '../singlePost.styles';
import { StyledAvatar } from '../../../header/header.styles';
import { addCommentReply } from '../../../../redux/actions';
import { useInput } from '../../../../hooks';

function EnhancedComment(props) {
  const { comment } = props;
  const [isReplyingTo, setIsReplyingTo] = useState(null);

  const {
    value: replyTo,
    bind: bindReplyTo,
    reset: resetReplyTo,
    setError: setReplyToError,
    hasError: replyToError,
  } = useInput('');

  function handleCommentReply(e) {
    e.preventDefault();
    props.addCommentReply(
      props.user.token,
      props.postId,
      replyTo,
      isReplyingTo,
    );
    resetReplyTo();
  }

  return (
    <StyledComment
      key={comment.comment_ID}
      className={props.isChild ? 'comment-reply' : ''}>
      <StyledCommentContainer>
        <StyledCommentUserData>
          <StyledAvatar className="no-touch" tabIndex="-1" size={32}>
            <img
              src={
                !comment.comment_author_avatar
                  ? '/static/icons/default_avatar.png'
                  : comment.comment_author_avatar
              }
              alt={props.user.username}
            />
          </StyledAvatar>
          <StyledCommentAuthorDate>
            <StyledCommentAuthor>{comment.comment_author}</StyledCommentAuthor>
            <StyledCommentDate>
              {moment(comment.comment_date).format('MMM Do')}
              <StyledCommentDateDivider />
              {moment(comment.comment_date).format('h:mm a')}
            </StyledCommentDate>
          </StyledCommentAuthorDate>
        </StyledCommentUserData>
        <p>{comment.comment_content}</p>
      </StyledCommentContainer>
      <StyledCommentReplyTo
        onClick={e => {
          e.preventDefault();
          setIsReplyingTo(comment.comment_ID);
          if (isReplyingTo === comment.comment_ID) {
            setIsReplyingTo(null);
          }
        }}>
        Reply
      </StyledCommentReplyTo>
      {isReplyingTo === comment.comment_ID && (
        <form onSubmit={handleCommentReply}>
          <StyledCommentReplyToInput {...bindReplyTo} autoFocus />
        </form>
      )}
      {props.comment.comment_children &&
        props.comment.comment_children.map(reply => (
          <EnhancedComment
            {...props}
            key={reply.comment_ID}
            user={props.user}
            postId={props.postId}
            comment={reply}
            isChild={true}
          />
        ))}
    </StyledComment>
  );
}

function Comments(props) {
  const { comments } = props;
  return (
    <StyledComments>
      {comments.map(comment => (
        <EnhancedComment
          {...props}
          key={comment.comment_ID}
          user={props.user}
          postId={props.postId}
          comment={comment}>
          {comment.comment_children &&
            comment.comment_children.map(child => (
              <EnhancedComment
                {...props}
                key={child.comment_ID}
                user={props.user}
                postId={props.postId}
                comment={child}
                isChild={true}
              />
            ))}
        </EnhancedComment>
      ))}
    </StyledComments>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  addCommentReply,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
