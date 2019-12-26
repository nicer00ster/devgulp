import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useSpring } from 'react-spring';
import { useRouter } from 'next/router';
import { Emoji } from 'emoji-mart';
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
  StyledEmojiPicker,
} from './publish.styles';
import Hints from './hints';
import Checkbox from '../checkbox';
import Loading from '../loading';
import Modal from '../modal';
import Emotes from '../emotes';
import { useInput, usePrevious, useMeasure } from '../../../hooks';
import { placeCaretAtEnd } from '../../../utils';
import {
  addPost,
  addMedia,
  toggleModal,
  toggleEmojis,
  closeEmojis,
} from '../../../redux/actions';
import { ALLOWED_MIME_TYPES } from '../../../redux/constants';

function EnhancedPublish(props) {
  const router = useRouter();
  const bodyRef = useRef();
  const [bind, { width, height, left, top }] = useMeasure();
  const [body, setBody] = useState(null);
  const [bodyError, setBodyError] = useState(false);
  const [emotes, setEmotes] = useState([]);
  const [active, setActive] = useState();
  const [emotePicker, setEmotePicker] = useState('heart_eyes');
  const [categories, setCategories] = useState([1]);
  const randomEmojis = [
    'smile',
    'sunglasses',
    'heart_eyes',
    'dizzy_face',
    'face_with_symbols_on_mouth',
    'sweat_smile',
    'laughing',
  ];
  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle,
    setError: setTitleError,
    hasError: titleError,
  } = useInput('');

  const prevPostId = usePrevious(props.addPostId);

  useEffect(() => {
    if (
      props.addPostId !== prevPostId &&
      props.addPostId !== null &&
      prevPostId !== undefined
    ) {
      router.push(`/post/${props.posts.addPostId}`);
    }
  }, [props.addPostId]);

  useEffect(() => {
    let sequence = [];
    let lastKeyTime = Date.now();

    bodyRef.current.addEventListener('keydown', e => {
      const charList = ':';
      const key = e.key.toLowerCase();

      if (charList.indexOf(key) === -1) return;

      const currentTime = Date.now();

      if (currentTime - lastKeyTime > 1000) {
        sequence = [];
      }

      if (e.shiftKey) {
        sequence.push(key);
        lastKeyTime = currentTime;
      }

      if (sequence[0] === ':' && sequence[1] === ':') {
        props.toggleEmojis();
        setTimeout(() => {
          document.querySelector('.emoji-mart-search input').focus();
        }, 150);
      }
    });
  }, []);

  const emojiSpring = useSpring({
    opacity: props.emojisOpen ? 1 : 0,
    transform: props.emojisOpen
      ? `translate3d(${left + width / 2 - 144}px, ${top +
          height / 2 -
          226}px, 0px)`
      : `translate3d(0px, 0px, 0px)`,
    pointerEvents: props.emojisOpen ? 'all' : 'none',
  });

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
      emoji: emoji.custom ? emoji : emoji.id,
      size: 24,
    });

    bodyRef.current.innerHTML =
      bodyRef.current.innerHTML.replace('::', '') + emojiHTML + '&nbsp;';
    props.closeEmojis();
    placeCaretAtEnd(bodyRef.current);
  }

  useEffect(() => {
    fetch('http://localhost:3000/emotes', {
      method: 'post',
    })
      .then(res => res.json())
      .then(data => {
        setEmotes(data.emotes);
      });
  }, []);

  return (
    <StyledPublish {...bind}>
      <Hints />
      <StyledPublishEmojis disabled={!props.emojisOpen} style={emojiSpring}>
        {emotes.length <= 0 ? null : (
          <Emotes emotes={emotes} addEmoji={addEmoji} bodyRef={bodyRef} />
        )}
      </StyledPublishEmojis>
      <StyledPublishContainer
        showEmojis={props.emojisOpen}
        disabled={props.posts.isAddingPost}
        aria-busy={props.posts.isAddingPost}>
        <StyledPublishTitle
          className={titleError && 'error'}
          placeholder="Title"
          {...bindTitle}
        />
        <StyledPublishBody
          ref={bodyRef}
          contentEditable={true}
          onInput={e => setBody(e.target.innerHTML)}
          className={bodyError && 'error'}
          placeholder="Tell your story."
        />
        <StyledEmojiPicker>
          <Emoji
            emoji={emotePicker}
            onOver={() =>
              setEmotePicker(
                randomEmojis[Math.floor(Math.random() * randomEmojis.length)],
              )
            }
            set="twitter"
            size={24}
            onClick={props.toggleEmojis}
          />
        </StyledEmojiPicker>
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
        {props.posts.imageUrl && <StyledPreviewImage src={props.posts.imageUrl} />}
      </Modal>
      {props.posts.isAddingPost && <Loading />}
    </StyledPublish>
  );
}

const mapStateToProps = ({ root, user, posts }) => ({
  emojisOpen: root.emojisOpen,
  addPostId: posts.addPostId,
  user,
  posts,
});

const mapDispatchToProps = {
  addPost,
  addMedia,
  toggleModal,
  toggleEmojis,
  closeEmojis,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedPublish);
