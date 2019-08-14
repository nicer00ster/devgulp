import Link from "next/link";
import moment from "moment";
import {
  StyleSinglePost,
  StyledSinglePostHeading,
  StyledSinglePostUser,
  StyledSinglePostAuthorDate,
  StyledSinglePostDate,
  StyledSinglePostAuthor,
  StyledSinglePostImage,
  StyledSinglePostContent
} from "./singlePost.styles";
import { StyledAvatar } from "../../header/header.styles";
import Loading from "../loading";

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function SinglePost(props) {
  const { post } = props.post;
  if (isEmpty(post)) {
    return <Loading />;
  }
  return (
    <StyleSinglePost>
      <StyledSinglePostHeading>{post.title.rendered}</StyledSinglePostHeading>
      <StyledSinglePostUser>
        <StyledAvatar tabIndex="-1" size={52}>
          <Link href={`/user?userId=${post._embedded["author"]["0"].id}`}>
            <a>
              <img
                src={
                  !post._embedded["author"]["0"].acf.avatar
                    ? "/static/icons/default_avatar.png"
                    : post._embedded["author"]["0"].acf.avatar
                }
                alt={post._embedded["author"]["0"].name}
              />
            </a>
          </Link>
        </StyledAvatar>
        <StyledSinglePostAuthorDate>
          <StyledSinglePostAuthor>
            {post._embedded["author"]["0"].name}
          </StyledSinglePostAuthor>
          <StyledSinglePostDate>
            {moment(post.date).format("MMM Do")}
          </StyledSinglePostDate>
        </StyledSinglePostAuthorDate>
      </StyledSinglePostUser>
      <StyledSinglePostImage
        src={
          post._embedded["wp:featuredmedia"]
            ? post._embedded["wp:featuredmedia"]["0"].source_url
            : "/static/images/default_post.jpeg"
        }
        alt={post._embedded["wp:featuredmedia"]["0"].title.rendered}
      />
      <StyledSinglePostContent
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      {props.post.isFetchingPost && <Loading />}
    </StyleSinglePost>
  );
}

export default SinglePost;
