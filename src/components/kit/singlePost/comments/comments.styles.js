import styled from 'styled-components';
import { animated } from 'react-spring';

const StyledCommentReplyToArea = styled.textarea`
  font-size: 14px;
  border-radius: ${props => props.theme.effects.radius};
  width: 100%;
  outline: 0;
  border: 0;
  color: ${props => props.theme.colors.black};
  font-family: 'Trirong', serif;
  letter-spacing: 1px;
  resize: none;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
  &[value]:not([value='']) ~ label,
  &:focus ~ label {
    top: -20px;
    left: 3px;
    font-size: 1rem;
    color: ${props => props.theme.colors.lightBlack};
  }
`;

const StyledComment = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 1.2rem 0;
  margin: 1.2rem;
  &.comment-reply {
    border-left: 1px solid ${props => props.theme.colors.grey};
    padding-left: 1.2rem;
    margin: 0.4rem;
  }
`;

const StyledCommentAuthor = styled.p`
  color: ${props => props.theme.colors.black};
  margin: 0;
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

const StyledCommentContainer = styled.div``;

const StyledCommentUserData = styled.a`
  display: inline-flex;
  align-items: center;
`;

const StyledCommentReplyTo = styled.a`
  padding: 0.4rem;
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

export {
  StyledCommentReplyToArea,
  StyledCommentUserData,
  StyledComment,
  StyledCommentReplyTo,
  StyledCommentContainer,
  StyledCommentAuthor,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentAuthorDate,
  StyledReplyContainer,
};
