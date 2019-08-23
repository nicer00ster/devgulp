import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
    StyledPreviewImage,
    StyledPreviewImageButton,
    StyledPublish,
    StyledPublishBody,
    StyledPublishButton,
    StyledPublishCategories,
    StyledPublishConfetti,
    StyledPublishContainer,
    StyledPublishIcon,
    StyledPublishImageUpload,
    StyledPublishImageUploadWrapper,
    StyledPublishTitle,
} from './publish.styles';
import Checkbox from '../checkbox';
import Loading from '../loading';
import Modal from '../modal';
import {useInput, usePrevious} from '../../../hooks';
import {addMedia, addPost, toggleModal} from '../../../redux/actions';
import {ALLOWED_MIME_TYPES} from '../../../redux/constants';

function EnhancedPublish(props) {
    const router = useRouter();
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
    const {
        value: body,
        bind: bindBody,
        reset: resetBody,
        setError: setBodyError,
        hasError: bodyError,
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
                props.posts.imageId,
            );
            resolve();
        })
            .then(() => {
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

        // Validate MIME type
        if (ALLOWED_MIME_TYPES.indexOf(files[0].type) == -1) {
            return new Error('File type not allowed.');
        } else {
            data.append('file', files[0]);
        }
        return data;
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
                    className={bodyError && 'error'}
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
                            ),
                    )}
                </StyledPublishCategories>
                {!props.posts.imageUrl ? (
                    <StyledPublishImageUploadWrapper
                        disabled={props.posts.isUploadingImage}
                        aria-busy={props.posts.isUploadingImage}>
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
                    disabled={active || props.posts.isAddingPost}
                    aria-busy={active || props.posts.isAddingPost}
                    className={active && 'active'}>
                    <StyledPublishIcon className={`fal fa-envelope-open-text`}/>
                    <StyledPublishConfetti color="palegreen"/>
                    <StyledPublishConfetti color="tomato"/>
                    <StyledPublishConfetti color="blue"/>
                    <StyledPublishConfetti color="yellow"/>
                    <StyledPublishConfetti color="pink"/>
                    <StyledPublishConfetti color="purple"/>
                    <StyledPublishConfetti color="orange"/>
                    <StyledPublishConfetti color="green"/>
                    {props.posts.isAddingPost && <Loading/>}
                </StyledPublishButton>
            </StyledPublishContainer>
            <Modal>
                {props.posts.imageUrl && (
                    <StyledPreviewImage src={props.posts.imageUrl}/>
                )}
            </Modal>
            {props.posts.isAddingPost && <Loading/>}
        </StyledPublish>
    );
}

const mapStateToProps = ({user, posts}) => ({
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
