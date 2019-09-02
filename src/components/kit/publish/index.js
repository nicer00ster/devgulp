import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';
import { useRouter } from 'next/router';
import { Picker, Emoji } from 'emoji-mart';
import {
  StyledPublish,
  StyledPublishContainer,
  StyledPublishTitle,
  StyledPublishBody,
  StyledPublishButton,
  StyledPublishImageUploadWrapper,
  StyledPublishImageUpload,
  StyledPreviewImageButton,
  StyledPreviewImage,
  StyledPublishCategories,
  StyledPublishConfetti,
  StyledPublishIcon,
  StyledPublishEmojis,
} from './publish.styles';
import Checkbox from '../checkbox';
import Loading from '../loading';
import Modal from '../modal';
import { useInput, usePrevious } from '../../../hooks';
import { addPost, addMedia, toggleModal } from '../../../redux/actions';
import { ALLOWED_MIME_TYPES } from '../../../redux/constants';

function EnhancedPublish(props) {
  const router = useRouter();
  const bodyRef = useRef();
  const [body, setBody] = useState(null);
  const [bodyError, setBodyError] = useState(false);
  const [active, setActive] = useState();
  const [categories, setCategories] = useState([1]);

  const prevPostId = usePrevious(props.addPostId);

  useEffect(() => {
    if (
      props.addPostId !== prevPostId &&
      props.addPostId !== null &&
      prevPostId !== undefined
    ) {
      router.push(`/post?id=${props.posts.addPostId}`);
    }
  }, [props.addPostId]);

  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle,
    setError: setTitleError,
    hasError: titleError,
  } = useInput('');

  function toggleButton() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1500);
  }

  function handleAddPost() {
    toggleButton();

    if (!title) {
      setTitleError(true);
    }
    if (!bodyRef.current.innerText.length) {
      setBodyError(true);
    }
    if (!title || !bodyRef.current.innerText.length) {
      return;
    }

    return new Promise((resolve, reject) => {
      props.addPost(
        props.user.token,
        title,
        bodyRef.current.innerHTML,
        categories,
        props.posts.imageId,
      );
      resolve();
    })
      .then(() => {
        resetTitle();
        bodyRef.current.innerHTML = '';
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleCategories(taxonomy) {
    if (!categories.includes(taxonomy)) {
      setCategories([...categories, taxonomy]);
    } else {
      setCategories(categories.filter(category => category !== taxonomy));
    }
  }

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

  function addEmoji(emoji) {
    const emojiHTML = Emoji({
      html: true,
      set: 'twitter',
      emoji: emoji.id,
      size: 24,
    });

    bodyRef.current.innerHTML += emojiHTML + '&nbsp;';
  }

  return (
    <StyledPublish>
      <StyledPublishContainer
        disabled={props.posts.isAddingPost}
        aria-busy={props.posts.isAddingPost}>
        <StyledPublishTitle
          className={titleError && 'error'}
          {...bindTitle}
          placeholder="Title"
        />
        <StyledPublishBody
          ref={bodyRef}
          contentEditable={true}
          onInput={e => setBody(e.target.innerHTML)}
          className={bodyError && 'error'}
          placeholder="Tell your story."></StyledPublishBody>
        <StyledPublishEmojis
          onMouseLeave={() =>
            document.body.classList.remove('show-emoji-picker')
          }
          onMouseEnter={() => document.body.classList.add('show-emoji-picker')}>
          <Picker
            onClick={emoji => addEmoji(emoji)}
            color="#80dad3"
            title="DevGulp"
            emoji="smile"
            set="twitter"
          />
        </StyledPublishEmojis>
        <StyledPublishCategories>
          {props.posts.categories.map(
            taxonomy =>
              taxonomy.id !== 1 && (
                <Checkbox
                  key={taxonomy.id}
                  label={taxonomy.name}
                  id={taxonomy.id}
                  handleCategories={handleCategories}
                />
              ),
          )}
        </StyledPublishCategories>
        <StyledPublishImageUploadWrapper
          disabled={props.posts.isUploadingImage}
          aria-busy={props.posts.isUploadingImage}>
          {!props.posts.imageUrl ? (
            <>
              <StyledPublishImageUpload
                onChange={e => props.addMedia(props.user.token, handleImage(e))}
                type="file"
                name="file"
                id="image-file"
                accept="image/*"
              />
              <label htmlFor="image-file">Choose an Image</label>
            </>
          ) : (
            <StyledPreviewImageButton onClick={() => props.toggleModal()}>
              Preview Image
            </StyledPreviewImageButton>
          )}
          <StyledPublishButton
            onClick={() => handleAddPost()}
            disabled={active || props.posts.isAddingPost || !title || !body}
            aria-busy={active || props.posts.isAddingPost}
            className={active && 'active'}>
            <StyledPublishIcon className={`fal fa-envelope-open-text`} />
            <StyledPublishConfetti color="palegreen" />
            <StyledPublishConfetti color="tomato" />
            <StyledPublishConfetti color="blue" />
            <StyledPublishConfetti color="yellow" />
            <StyledPublishConfetti color="pink" />
            <StyledPublishConfetti color="purple" />
            <StyledPublishConfetti color="orange" />
            <StyledPublishConfetti color="green" />
            {props.posts.isAddingPost && <Loading />}
          </StyledPublishButton>
        </StyledPublishImageUploadWrapper>
      </StyledPublishContainer>
      <Modal>
        {props.posts.imageUrl && (
          <StyledPreviewImage src={props.posts.imageUrl} />
        )}
      </Modal>
      {props.posts.isAddingPost && <Loading />}
    </StyledPublish>
  );
}

const mapStateToProps = ({ user, posts }) => ({
  user,
  posts,
  addPostId: posts.addPostId,
});

const mapDispatchToProps = {
  addPost,
  addMedia,
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedPublish);
