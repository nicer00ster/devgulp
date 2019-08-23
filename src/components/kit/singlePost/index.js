import Link from 'next/link';
import { connect } from 'react-redux';
import moment from 'moment';
import { useEffect, useState, useCallback } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import { useMeasure, useInput } from '../../../hooks';
import {
  StyleSinglePost,
  StyledSinglePostContainer,
  StyledSinglePostHeading,
  StyledSinglePostMeta,
  StyledSinglePostMetaMore,
  StyledMoreItems,
  StyledMoreItem,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostAuthor,
  StyledSinglePostImage,
  StyledSinglePostContent,
  StyledComments,
  StyledCommentsHeading,
  StyledCommentReply,
  StyledCommentReplyInput,
  StyledLikeContainer,
  StyledLikeCount,
  StyledSidebar,
} from './singlePost.styles';
import { StyledAvatar } from '../../header/header.styles';
import { StyledDivider } from '../globals/globals.styles';
import { addComment, updatePostLikes } from '../../../redux/actions';
import LikeButton from '../likeButton';
import Comments from './comments';

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
    window.scrollY > bind.ref.current.scrollHeight - 150
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
    transform: `translateX(-${(width / 2) + (leftOffset / 2)}px)`,
    opacity: isScrolled && !isBottom ? 1 : 0,
  });

  const likesTransition = useTransition(props.isUpdatingLikes, null, {
    from: {
      transform: props.isUpdatingLikes ? `translateY(25px)` : `translateY(0px)`,
      opacity: props.isUpdatingLikes ? 0 : 1,
      position: 'absolute',
    },
    enter: {
      transform: `translateY(0px)`,
      opacity: 1,
    },
    leave: {
      transform: props.isUpdatingLikes ? `translateY(-25px)` : `translateY(0px)`,
      opacity: 0,
    },
  });

  return (
      <StyledSinglePostContainer>
        <StyleSinglePost {...bind}>
          <StyledSidebar style={spring}>
            <LikeButton
                isLiked={post.acf.post_likes.includes(props.user.id)}
                onClick={() =>
                    props.updatePostLikes(
                        props.user.token,
                        post.acf.post_likes,
                        post.id,
                        props.user.id,
                    )
                }
            />
          </StyledSidebar>
          <StyledSinglePostHeading>{post.title.rendered}</StyledSinglePostHeading>
          <StyledSinglePostMeta>
            <StyledAvatar tabIndex="-1" size={52}>
              <Link href={`/user?userId=${post._embedded['author']['0'].id}`}>
                <a>
                  <img
                      src={
                        !post._embedded['author']['0'].acf.avatar
                            ? '/static/icons/default_avatar.png'
                            : post._embedded['author']['0'].acf.avatar
                      }
                      alt={
                        post._embedded['author']['0'].name
                            ? post._embedded['author']['0'].name
                            : 'Alt Image'
                      }
                  />
                </a>
              </Link>
            </StyledAvatar>
            <StyledSinglePostAuthorDate>
              <StyledSinglePostAuthor>
                {post._embedded['author']['0'].name}
              </StyledSinglePostAuthor>
              <StyledSinglePostDate>
                {moment(post.date).format('MMM Do')}
              </StyledSinglePostDate>
            </StyledSinglePostAuthorDate>
          </StyledSinglePostMeta>
          <StyledSinglePostImage
              src={
                post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia']['0'].source_url
                    : '/static/images/default_post.jpeg'
              }
              alt={
                post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia']['0'].title.rendered
                    : 'Default Post Image'
              }
          />
          <StyledSinglePostContent
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
          />
        </StyleSinglePost>
          <StyledSinglePostMetaMore>
            <StyledLikeContainer>
              <LikeButton
                  isLiked={post.acf.post_likes.includes(props.user.id)}
                  onClick={() =>
                      props.updatePostLikes(
                          props.user.token,
                          post.acf.post_likes,
                          post.id,
                          props.user.id,
                      )
                  }
              />
            <StyledLikeCount>
              {likesTransition.map(({ item, props, key }) => (
                  <animated.span key={key} style={props}>{post.acf.post_likes.length}</animated.span>
              ))}
              like{post.acf.post_likes.length > 1 ? 's' : ''}
            </StyledLikeCount>
            </StyledLikeContainer>
            <StyledMoreItems>
              <StyledMoreItem>
                <i className="fal fa-share-alt" />
              </StyledMoreItem>
              <StyledMoreItem>
                <i className="fal fa-bookmark" />
              </StyledMoreItem>
              <StyledMoreItem>
                <i className="fal fa-ellipsis-h-alt" />
              </StyledMoreItem>
            </StyledMoreItems>
          </StyledSinglePostMetaMore>
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
            <Comments postId={post.id} comments={post.comments} />
          </StyledComments>
      </StyledSinglePostContainer>

  );
}

const mapStateToProps = ({ user, post }) => ({
  isUpdatingLikes: post.isUpdatingLikes,
  user,
});

const mapDispatchToProps = {
  addComment,
  updatePostLikes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
