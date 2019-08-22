import { useState } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import {
    StyledComment,
    StyledCommentAuthor,
    StyledCommentAuthorDate,
    StyledCommentContainer,
    StyledCommentDate,
    StyledCommentDateDivider,
    StyledCommentReplyTo,
    StyledCommentReplyToInput,
    StyledCommentUserData
} from "../singlePost.styles";
import { StyledAvatar } from "../../../header/header.styles";
import { addCommentReply } from "../../../../redux/actions";
import { useInput } from "../../../../hooks";

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
        props.addCommentReply(props.user.token, post.id, replyTo, isReplyingTo);
        resetReplyTo();
    }

    return (
        <StyledComment key={comment.comment_ID}>
            <StyledCommentContainer>
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
                            {comment.comment_author}
                        </StyledCommentAuthor>
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
            {props.children}
        </StyledComment>
    );
}

function Comment(props) {
    const { comment } = props;
    return (
        <EnhancedComment {...props}>
            {comment.comment_children && comment.comment_children.map(child =>
                <EnhancedComment comment={child} user={props.user} />
            )}
        </EnhancedComment>
    );
}

const mapStateToProps = ({ user }) => ({
   user,
});

const mapDispatchToProps = {
    addCommentReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
