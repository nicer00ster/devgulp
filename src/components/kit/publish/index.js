import { connect } from "react-redux";
import { useState } from "react";
import {
  StyledPublish,
  StyledPublishTitle,
  StyledPublishBody,
  StyledPublishButton,
  StyledPublishImageUploadWrapper,
  StyledPublishImageUpload,
  StyledPreviewImageButton,
  StyledPreviewImage,
  StyledPublishCategories,
  StyledPublishConfetti,
  StyledPublishIcon
} from "./publish.styles";
import Checkbox from "../checkbox";
import Loading from "../loading";
import Modal from "../modal";
import { useInput } from "../../../hooks";
import { addPost, addMedia, toggleModal } from "../../../redux/actions";

function EnhancedPublish(props) {
  const [active, setActive] = useState();
  const [categories, setCategories] = useState([1]);
  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle,
    setError: setTitleError,
    hasError: titleError
  } = useInput("");
  const {
    value: body,
    bind: bindBody,
    reset: resetBody,
    setError: setBodyError,
    hasError: bodyError
  } = useInput("");

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
    if (!body) {
      setBodyError(true);
    }
    if (!title || !body) {
      return;
    }

    return new Promise((resolve, reject) => {
      props.addPost(
        props.user.token,
        title,
        body,
        categories,
        props.posts.imageId
      );
      resolve();
    })
      .then(() => {
        setActive(false);
        resetTitle();
        resetBody();
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
    // Allowed types
    const mimeTypes = ["image/jpeg", "image/png"];

    // Validate MIME type
    // if (mimeTypes.indexOf(files[0].type) == -1) {
    //   console.log("error");
    //   return;
    // } else {
      data.append("file", files[0]);
      return data;
    // }
  }

  return (
    <StyledPublish>
      <StyledPublishTitle
        className={titleError && "error"}
        {...bindTitle}
        placeholder="Title"
      />
      <StyledPublishBody
        className={bodyError && "error"}
        rows={10}
        {...bindBody}
        placeholder="Tell your story."
      />
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
            )
        )}
      </StyledPublishCategories>
      {!props.posts.imageUrl ? (
        <StyledPublishImageUploadWrapper
          disabled={props.posts.isUploadingImage}
          aria-busy={props.posts.isUploadingImage}
        >
          <StyledPublishImageUpload
            onChange={e => props.addMedia(props.user.token, handleImage(e))}
            type="file"
            name="file"
            id="image-file"
            accept="image/*"
          />
          <label htmlFor="image-file">Choose an Image</label>
        </StyledPublishImageUploadWrapper>
      ) : (
        <StyledPreviewImageButton onClick={() => props.toggleModal()}>
          Preview Image
        </StyledPreviewImageButton>
      )}
      <StyledPublishButton
        onClick={() => handleAddPost()}
        disabled={active}
        aria-busy={active}
        className={active && "active"}
      >
        <StyledPublishIcon className={`${!active ? "far" : "fas"} fa-share`} />
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
      <Modal>
        {props.posts.imageUrl && (
          <StyledPreviewImage src={props.posts.imageUrl} />
        )}
      </Modal>
    </StyledPublish>
  );
}

const mapStateToProps = ({ user, posts }) => ({
  user,
  posts
});

const mapDispatchToProps = {
  addPost,
  addMedia,
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedPublish);
