import Link from 'next/link';
import { connect } from 'react-redux';
import moment from 'moment';
import { useEffect, useState, useCallback } from 'react';
import { useSpring } from 'react-spring';
import { useMeasure, useInput } from '../../../hooks';
import {
  StyleSinglePost,
  StyledSinglePostHeading,
  StyledSinglePostUser,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostAuthor,
  StyledSinglePostImage,
  StyledSinglePostContent,
  StyledComments,
  StyledCommentsHeading,
  StyledCommentReply,
  StyledCommentReplyInput,
  StyledCommentReplyTo,
  StyledCommentReplyToInput,
  StyledComment,
  StyledCommentContainer,
  StyledCommentAuthorDate,
  StyledCommentUserData,
  StyledCommentAuthor,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledSidebar,
} from './singlePost.styles';
import { StyledAvatar } from '../../header/header.styles';
import { StyledDivider } from '../globals/globals.styles';
import { addComment, addCommentReply } from '../../../redux/actions';
import Loading from '../loading';
import LikeButton from '../likeButton';

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function SinglePost(props) {
  const { post } = props.post;
  const [bind, { width }] = useMeasure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [leftOffset, setLeftOffset] = useState(0);
  const [isReplyingTo, setIsReplyingTo] = useState(null);

  const {
    value: reply,
    bind: bindReply,
    reset: resetReply,
    setError: setReplyError,
    hasError: replyError,
  } = useInput('');

  const {
    value: replyTo,
    bind: bindReplyTo,
    reset: resetReplyTo,
    setError: setReplyToError,
    hasError: replyToError,
  } = useInput('');

  const handleWindowScroll = useCallback(() => {
    window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    window.scrollY > bind.ref.current.scrollHeight - 50
      ? setIsBottom(true)
      : setIsBottom(false);

    setLeftOffset(bind.ref.current.offsetLeft);
  }, []);

  function handleReply(e) {
    e.preventDefault();
    props.addComment(props.user.token, post.id, reply);
    resetReply();
  }

  function handleCommentReply(e) {
    e.preventDefault();
    props.addCommentReply(props.user.token, post.id, replyTo, isReplyingTo);
    resetReplyTo();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll]);

  const spring = useSpring({
    transform: `translateX(-${width / 2 + leftOffset / 2}px)`,
    opacity: isScrolled && !isBottom ? 1 : 0,
  });

  return (
    <StyleSinglePost {...bind}>
      <StyledSidebar style={spring}>
        <LikeButton />
        <LikeButton />
      </StyledSidebar>
      {props.post.isFetchingPost ? (
        <Loading />
      ) : (
        <>
          <StyledSinglePostHeading>
            {!isEmpty(post) && post.title.rendered}
          </StyledSinglePostHeading>
          <StyledSinglePostUser>
            <StyledAvatar tabIndex="-1" size={52}>
              <Link
                href={`/user?userId=${!isEmpty(post) &&
                  post._embedded['author']['0'].id}`}>
                <a>
                  <img
                    src={
                      !isEmpty(post) &&
                      !post._embedded['author']['0'].acf.avatar
                        ? '/static/icons/default_avatar.png'
                        : !isEmpty(post)
                        ? post._embedded['author']['0'].acf.avatar
                        : '/static/icons/default_avatar.png'
                    }
                    alt={
                      !isEmpty(post)
                        ? post._embedded['author']['0'].name
                        : 'Alt Image'
                    }
                  />
                </a>
              </Link>
            </StyledAvatar>
            <StyledSinglePostAuthorDate>
              <StyledSinglePostAuthor>
                {!isEmpty(post) && post._embedded['author']['0'].name}
              </StyledSinglePostAuthor>
              <StyledSinglePostDate>
                {!isEmpty(post) && moment(post.date).format('MMM Do')}
              </StyledSinglePostDate>
            </StyledSinglePostAuthorDate>
          </StyledSinglePostUser>
          <StyledSinglePostImage
            src={
              !isEmpty(post) && post._embedded['wp:featuredmedia']
                ? post._embedded['wp:featuredmedia']['0'].source_url
                : '/static/images/default_post.jpeg'
            }
            alt={
              !isEmpty(post) && post._embedded['wp:featuredmedia']
                ? !isEmpty(post) &&
                  post._embedded['wp:featuredmedia']['0'].title.rendered
                : 'Default Post Image'
            }
          />
          <StyledSinglePostContent
            dangerouslySetInnerHTML={{
              __html: !isEmpty(post) && post.content.rendered,
            }}
          />
          <StyledDivider />
          <StyledComments>
            <StyledCommentsHeading>Replies</StyledCommentsHeading>
            <StyledCommentReply onSubmit={handleReply}>
              <StyledAvatar className="no-touch" tabIndex="-1" size={36}>
                <img
                  src={
                    !props.user.avatar
                      ? '/static/icons/default_avatar.png'
                      : props.user.avatar
                  }
                  alt={props.user.username}
                />
              </StyledAvatar>
              <StyledCommentReplyInput
                {...bindReply}
                placeholder="Have something to say?"
              />
            </StyledCommentReply>
            {!isEmpty(post) &&
              post.comments.map(comment => (
                <StyledComment key={comment.id}>
                  {comment._links['in-reply-to'] &&
                    comment._links['in-reply-to'].map(reply => (
                      <div key={reply.href}>{reply.href}</div>
                    ))}
                  <StyledCommentContainer
                    className={
                      comment._links['in-reply-to'] &&
                      comment._links['in-reply-to'] &&
                      'comment-reply'
                    }>
                    <StyledCommentUserData>
                      <StyledAvatar
                        className="no-touch"
                        tabIndex="-1"
                        size={32}>
                        <img
                          src={
                            !comment.user_avatar
                              ? '/static/icons/default_avatar.png'
                              : comment.user_avatar
                          }
                          alt={props.user.username}
                        />
                      </StyledAvatar>
                      <StyledCommentAuthorDate>
                        <StyledCommentAuthor>
                          {comment.author_name}
                        </StyledCommentAuthor>
                        <StyledCommentDate>
                          {moment(comment.date).format('MMM Do')}
                          <StyledCommentDateDivider />
                          {moment(comment.date).format('h:mm a')}
                        </StyledCommentDate>
                      </StyledCommentAuthorDate>
                    </StyledCommentUserData>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: comment.content.rendered,
                      }}
                    />
                  </StyledCommentContainer>
                  <StyledCommentReplyTo onClick={e => {
                    e.preventDefault();
                    setIsReplyingTo(comment.id);
                    if(isReplyingTo === comment.id) {
                      setIsReplyingTo(null);
                    };
                  }}>
                    Reply
                  </StyledCommentReplyTo>
                  {isReplyingTo === comment.id && (
                      <form onSubmit={handleCommentReply}>
                        <StyledCommentReplyToInput {...bindReplyTo} autoFocus />
                      </form>
                  )}
                </StyledComment>
              ))}
          </StyledComments>
        </>
      )}
    </StyleSinglePost>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  addComment,
  addCommentReply,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
