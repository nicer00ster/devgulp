import React, { useRef } from 'react';
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
  StyledDateViewsDivider,
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
import {
  StyledPostTaxonomies,
  StyledPostTaxonomyItem,
} from '../posts/posts.styles';
import { addComment, updatePostLikes } from '../../../redux/actions';
import { getTaxonomyIcon } from '../../../utils';
import LikeButton from '../likeButton';
import ShareButton from '../shareButton';
import Comments from './comments';
import SocialSharing from '../social';
import Tooltip from '../tooltip';
import Achievements from '../achievements';

function SinglePost(props) {
  const { post } = props.post;
  const [bind, { width, height }] = useMeasure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [leftOffset, setLeftOffset] = useState(0);
  const [scroll, setScroll] = useState(window.scrollY);
  const [isReplyingTo, setIsReplyingTo] = useState(null);
  const [open, set] = useState(false);

  const {
    value: reply,
    bind: bindReply,
    reset: resetReply,
    setError: setReplyError,
    hasError: replyError,
  } = useInput('');

  const handleWindowScroll = useCallback(() => {
    setScroll(window.scrollY);

    window.scrollY > bind.ref.current.scrollHeight - 150
      ? setIsBottom(true)
      : setIsBottom(false);
    window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);

    setLeftOffset(bind.ref.current.offsetLeft);
  }, []);

  function handleReply(e) {
    e.preventDefault();
    props.addComment(props.user.token, post.id, reply);
    resetReply();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('resize', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleWindowScroll);
    };
  }, []);

  const spring = useSpring({
    transform: `translateX(-${width / 2 +
      leftOffset * 6}px) translateY(${scroll}px)`,
    opacity: !isBottom && isScrolled ? 1 : 0,
  });

  const likesTransition = useTransition(props.isUpdatingLikes, null, {
    from: {
      transform: props.isUpdatingLikes ? `translateY(25px)` : `translateY(0px)`,
      opacity: 0,
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
        <StyledSidebar
          style={spring}
          className={props.screenWidth < 1024 ? 'hide' : ''}>
          <LikeButton
            token={props.user.token}
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
          <ShareButton postName={post.title.rendered} />
        </StyledSidebar>
        <StyledSinglePostHeading>{post.title.rendered}</StyledSinglePostHeading>
        <StyledSinglePostMeta>
          <StyledAvatar tabIndex="-1" size={96}>
            <Link
              href="/user/[id]"
              as={`/user/${post._embedded['author']['0'].id}`}>
              <a>
                <img
                  src={
                    !post._embedded['author']['0'].acf.avatar
                      ? '/static/images/default_avatar.png'
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
              <Achievements user={post._embedded['author']['0']} size={30} />
              <span>{post._embedded['author']['0'].name}</span>
            </StyledSinglePostAuthor>
            <StyledSinglePostDate>
              {moment(post.date).format('MMM Do')}
              <StyledDateViewsDivider />
              {props.views} views
            </StyledSinglePostDate>
          </StyledSinglePostAuthorDate>
          <StyledPostTaxonomies className="single-post">
            {post._embedded['wp:term']['0'].map(
              (term, index) =>
                term.name !== 'Uncategorized' && (
                  <StyledPostTaxonomyItem data-tooltip="true" key={index}>
                    <span
                      className={getTaxonomyIcon(
                        post._embedded['wp:term']['0'][index].name,
                      )}
                    />
                    <Tooltip
                      content={post._embedded['wp:term']['0'][index].name}
                    />
                  </StyledPostTaxonomyItem>
                ),
            )}
          </StyledPostTaxonomies>
        </StyledSinglePostMeta>
        <StyledSinglePostImage
          imageUrl={
            post._embedded['wp:featuredmedia']
              ? post._embedded['wp:featuredmedia']['0'].source_url
              : '/static/images/default_post.jpg'
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
            token={props.user.token}
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
              <animated.span key={key} style={props}>
                {post.acf.post_likes.length}
              </animated.span>
            ))}
            like{post.acf.post_likes.length !== 1 ? 's' : ''}
          </StyledLikeCount>
        </StyledLikeContainer>
        <StyledMoreItems>
          <SocialSharing open={open} postName={post.title.rendered} />
          <StyledMoreItem className={open && 'active'} onClick={() => set(!open)}>
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
                  ? '/static/images/default_avatar.png'
                  : props.user.avatar
              }
              alt={props.user.username}
            />
          </StyledAvatar>
          <StyledCommentReplyInput
            {...bindReply}
            disabled={!props.user.token}
            placeholder={
              !props.user.token ? 'Sign in to comment.' : 'Have something to say?'
            }
          />
        </StyledCommentReply>
        <Comments
          isReplyingTo={isReplyingTo}
          setIsReplyingTo={setIsReplyingTo}
          postId={post.id}
          comments={post.comments}
        />
      </StyledComments>
    </StyledSinglePostContainer>
  );
}

const mapStateToProps = ({ root, user, post }) => ({
  screenWidth: root.screenWidth,
  isUpdatingLikes: post.isUpdatingLikes,
  views: post.views,
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
