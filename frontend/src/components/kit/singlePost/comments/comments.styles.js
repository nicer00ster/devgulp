import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledCommentReplyToArea = styled.textarea`
  font-size: 14px;
  border-radius: ${props => props.theme.effects.radius};
  width: 100%;
  outline: 0;
  border: 0;
  padding: 1.2rem;
  color: ${props => props.theme.colors.black};
  font-family: 'Trirong', serif;
  letter-spacing: 1px;
  resize: none;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
  &[value]:not([value='']) ~ label,
  &:focus ~ label {
    top: -20px;
    left: 14px;
    font-size: 1rem;
    color: ${props => props.theme.colors.lightBlack};
  }
`;

const StyledComment = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  margin: 1.2rem 0;
  padding: 1.2rem;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 3px;
  &.comment-reply {
    border: unset;
    border-radius: unset;
    border-left: 1px dashed ${props => props.theme.colors.black};
    margin-left: 8px;
    padding: 0 0 0 14px;
  }
`;

const StyledCommentAuthor = styled.p`
  color: ${props => props.theme.colors.black};
`;

const StyledCommentDate = styled.time`
  color: ${props => props.theme.colors.lightBlack};
`;

const StyledCommentAuthorDate = styled.div`
  padding-left: 0.6rem;
`;

const StyledCommentDateDivider = styled.span`
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  &:before {
    font-weight: bold;
    content: '\\00B7';
  }
`;

const StyledCommentContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledCommentContentContainer = styled.div`
  padding: 1.2rem;
`;

const StyledCommentContentUserRef = styled.a`
  border-radius: ${props => props.theme.effects.radius};
  background-color: ${props => props.theme.colors.lightGreen};
  padding: 0.2rem 0.4rem;
`;

const StyledCommentContent = styled.div`
  p {
    font-size: 14px;
  }
  p br {
    content: '' !important;
    display: block !important;
    margin-bottom: 1.5em !important;
  }
`;

const StyledCommentUserData = styled.a`
  display: inline-flex;
  align-items: center;
`;

const StyledCommentReplyTo = styled.a`
  align-self: flex-start;
  padding: 1.2rem;
  transition: all 0.25s;
  &.active-reply {
    transform: translateY(-25px);
    opacity: 0;
    z-index: -1;
  }
`;

const StyledReplyContainer = styled(animated.div)`
  label {
    color: ${props => props.theme.colors.black};
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 6px;
    transition: 300ms ease all;
  }
`;

const StyledEnhancedComments = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  transition: all 0.25s ease-in;
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const StyledConversationWith = styled.p`
  position: absolute;
  font-family: 'Trirong', serif;
  font-size: 1.6rem;
  text-align: center;
  top: -22px;
  padding: 0 0.6rem;
  background-color: ${props => props.theme.colors.white};
`;

export {
  StyledCommentReplyToArea,
  StyledCommentUserData,
  StyledComment,
  StyledEnhancedComments,
  StyledCommentReplyTo,
  StyledCommentContainer,
  StyledCommentAuthor,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentAuthorDate,
  StyledReplyContainer,
  StyledCommentContentContainer,
  StyledCommentContentUserRef,
  StyledCommentContent,
  StyledConversationWith,
};
