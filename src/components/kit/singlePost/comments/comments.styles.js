import styled from 'styled-components';
import { StyledCommentReplyInput } from '../singlePost.styles';

const StyledCommentReplyToInput = styled(StyledCommentReplyInput)`
  font-size: 14px;
  border-radius: ${props => props.theme.effects.radius};
  background-color: rgba(0, 0, 0, 0.05);
`;

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  // box-shadow: ${props => props.theme.effects.shadowHover};
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

const StyledCommentContainer = styled.div`

`;

const StyledCommentUserData = styled.a`
  display: inline-flex;
  align-items: center;
`;
const StyledCommentReplyTo = styled.a`
  padding: 0.4rem;
`;

export {
  StyledCommentReplyToInput,
  StyledCommentUserData,
  StyledComment,
  StyledCommentReplyTo,
  StyledCommentContainer,
  StyledCommentAuthor,
  StyledCommentDate,
  StyledCommentDateDivider,
  StyledCommentAuthorDate,
};
