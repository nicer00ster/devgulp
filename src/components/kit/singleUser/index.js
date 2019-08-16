import moment from 'moment';
import {
    StyledSingleUser,
    StyledSingleUserContainer,
    StyledSingleUserInfo,
    StyledSingleUserContent,
    StyledSingleUserName,
    StyledSingleUserDate,
    StyledSingleUserDescription,
} from "./singleUser.styles";
import { StyledAvatar } from "../../header/header.styles";
import Background from '../background';
import Loading from '../loading';

function SingleUser(props) {
  const { author, isFetchingAuthor } = props.author;
  if(isFetchingAuthor) {
      return <Loading />
  }
  return (
      <StyledSingleUser>
          <Background rotate="12deg"/>
          <StyledSingleUserContainer>
              <StyledSingleUserContent>
                  <StyledSingleUserInfo>
                      <StyledSingleUserName>
                          {author.name}
                      </StyledSingleUserName>
                      <StyledSingleUserDate>
                          Active user since
                          {` `}
                          {moment(author.user_registered).format("MMMM Do, YYYY")}
                      </StyledSingleUserDate>
                      <StyledSingleUserDescription>
                          {author.description}
                      </StyledSingleUserDescription>
                  </StyledSingleUserInfo>
                  <StyledAvatar size={100} style={{ pointerEvents: 'none' }} tabIndex={-1}>
                      <img
                          alt="Avatar"
                          style={{ border: '1px solid #1f222e', padding: '4px' }}
                          src={
                              !author.acf.author
                                  ? '/static/icons/default_avatar.png'
                                  : author.acf.avatar
                          }
                      />
                  </StyledAvatar>
              </StyledSingleUserContent>
          </StyledSingleUserContainer>
      </StyledSingleUser>
  );
}

export default SingleUser;
