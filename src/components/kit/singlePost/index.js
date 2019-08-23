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
  StyledSidebar,
} from './singlePost.styles';
import { StyledAvatar } from '../../header/header.styles';
import { StyledDivider } from '../globals/globals.styles';
import { addComment } from '../../../redux/actions';
import Loading from '../loading';
import LikeButton from '../likeButton';
import Comments from './comments';

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

  const {
    value: reply,
    bind: bindReply,
    reset: resetReply,
    setError: setReplyError,
    hasError: replyError,
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
            <StyledCommentsHeading>Conversation</StyledCommentsHeading>
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
            {!isEmpty(post) && (
              <Comments postId={post.id} comments={post.comments} />
            )}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
