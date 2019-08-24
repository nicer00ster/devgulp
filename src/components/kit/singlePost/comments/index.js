import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { useTrail } from 'react-spring';
import {
  StyledComment,
  StyledCommentAuthor,
  StyledCommentAuthorDate,
  StyledCommentContainer,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentReplyTo,
  StyledCommentReplyToArea,
  StyledCommentUserData,
  StyledCommentContentContainer,
  StyledCommentContentUserRef,
  StyledCommentContent,
  StyledReplyContainer,
} from './comments.styles';
import { StyledComments } from '../singlePost.styles';
import { StyledAvatar } from '../../../header/header.styles';
import { addCommentReply } from '../../../../redux/actions';
import { useInput, useOnClickOutside } from '../../../../hooks';

function EnhancedComment(props) {
  const { comment } = props;
  const replyRef = useRef();
  const {
    value: replyTo,
    bind: bindReplyTo,
    reset: resetReplyTo,
    setError: setReplyToError,
    hasError: replyToError,
  } = useInput('');

  useOnClickOutside(replyRef, () => {
    props.setIsReplyingTo(null);
  });

  useEffect(() => {
    if (props.isAddingComment) {
      props.setIsReplyingTo(null);
    }
  }, [props.isAddingComment]);

  function handleCommentReply(e) {
    e.preventDefault();
    props.addCommentReply(
      props.user.token,
      props.postId,
      replyTo,
      props.isReplyingTo,
    );
    resetReplyTo();
  }

  const inputTrail = useTrail(1, {
    opacity: props.isReplyingTo !== null ? 1 : 0,
    x: props.isReplyingTo !== null ? 5 : 20,
    height: props.isReplyingTo !== null ? 'auto' : 0,
    pointerEvents: props.isReplyingTo !== null ? 'all' : 'none',
    from: {
      opacity: 0,
      x: 20,
      height: 0,
    },
  });

  return (
    <StyledComment
      key={comment.comment_ID}
      className={props.isChild ? 'comment-reply' : ''}>
      <StyledCommentContainer>
        <Link href={`/user?userId=${comment.user_id}`}>
          <StyledCommentUserData
            aria-label={`Click to view ${comment.comment_author}'s profile.`}
            href="#">
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
              <StyledCommentAuthor>
                {comment.comment_author}
              </StyledCommentAuthor>
              <StyledCommentDate>
                {moment(comment.comment_date).format('MMM Do')}
                <StyledCommentDateDivider />
                {moment(comment.comment_date).format('h:mm a')}
              </StyledCommentDate>
            </StyledCommentAuthorDate>
          </StyledCommentUserData>
        </Link>
        <StyledCommentContentContainer>
          {comment.comment_parent !== '0' && (
            <Link href={`/user?userId=${comment.comment_parent_user_id}`}>
              <StyledCommentContentUserRef
                aria-label={`Reply references ${comment.comment_parent_user}.`}
                href="#">
                @{comment.comment_parent_user}
              </StyledCommentContentUserRef>
            </Link>
          )}
          <StyledCommentContent
            dangerouslySetInnerHTML={{ __html: comment.comment_content }}
          />
        </StyledCommentContentContainer>
      </StyledCommentContainer>
      <StyledCommentReplyTo
        href="#"
        aria-label={`Reply to ${comment.comment_author}.`}
        className={props.isReplyingTo === comment.comment_ID && 'active-reply'}
        onClick={e => {
          e.preventDefault();
          props.setIsReplyingTo(comment.comment_ID);
        }}>
        Reply
      </StyledCommentReplyTo>
      {props.isReplyingTo === comment.comment_ID &&
        inputTrail.map(({ x, height, opacity, ...rest }, index) => (
          <StyledReplyContainer
            key={index}
            ref={replyRef}
            name={comment.comment_author}
            style={{
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
              opacity: props.isReplyingTo === comment.comment_ID && opacity,
              height: props.isReplyingTo === comment.comment_ID && height,
              ...rest,
            }}>
            <StyledCommentReplyToArea
              {...bindReplyTo}
              autoFocus
              onKeyDown={e => {
                if (e.keyCode === 13 && e.shiftKey === false) {
                  e.preventDefault();
                  handleCommentReply(e);
                }
              }}
            />
            <label>Replying to {comment.comment_author}</label>
          </StyledReplyContainer>
        ))}
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

const mapStateToProps = ({ user, post }) => ({
  user,
  isAddingComment: post.isAddingComment,
});

const mapDispatchToProps = {
  addCommentReply,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
