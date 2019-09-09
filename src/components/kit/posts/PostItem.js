import {
  StyledPost,
  StyledDateAuthor,
  StyledDateAuthorDivider,
  StyledPostAuthor,
  StyledPostContent,
  StyledPostDateStamp,
  StyledPostExcerpt,
  StyledPostImage,
  StyledPostTaxonomies,
  StyledPostTaxonomyItem,
  StyledPostTitle,
  StyledPostCommentCount,
} from './posts.styles';
import Link from 'next/link';
import { getTaxonomyIcon } from '../../../utils';
import moment from 'moment';

function PostItem(props) {
  return (
    <StyledPost
      key={props.post.id}
      className={props.className}
      style={props.style}>
      <Link href="/post/[id]" as={`/post/${props.post.id}`}>
        <a>
          <StyledPostTaxonomies>
            {props.post._embedded['wp:term'] && props.post._embedded['wp:term']['0']['0'].name !== 'Uncategorized' &&
              props.post._embedded['wp:term']['0'].map((term, index) => (
                <StyledPostTaxonomyItem key={index}>
                  <span
                    className={getTaxonomyIcon(
                      props.post._embedded['wp:term']['0'][index].name,
                    )}
                  />
                </StyledPostTaxonomyItem>
              ))}
          </StyledPostTaxonomies>
          <StyledPostContent>
            <StyledPostTitle>
              {props.post.title.rendered || props.post.title}
            </StyledPostTitle>
            <StyledPostExcerpt
              dangerouslySetInnerHTML={{
                __html: props.post.excerpt.rendered,
              }}
            />
            <StyledPostCommentCount>
              <i className="fal fa-comment-lines" />
              <span>
                {props.post.comments.length} comment
                {props.post.comments.length === 1 ? '' : 's'}
              </span>
            </StyledPostCommentCount>
            <StyledDateAuthor>
              <StyledPostDateStamp>
                {moment(props.post.date).format('MMM Do')}
              </StyledPostDateStamp>
              <StyledDateAuthorDivider />
              <StyledPostAuthor>
                {props.post._embedded['author']['0'].name}
              </StyledPostAuthor>
            </StyledDateAuthor>
          </StyledPostContent>
          <StyledPostImage
            className="post-image"
            src={
              props.post._embedded && props.post._embedded['wp:featuredmedia']
                ? props.post._embedded['wp:featuredmedia']['0'].source_url
                : '/static/images/default_post.jpeg'
            }
          />
        </a>
      </Link>
    </StyledPost>
  );
}

export default PostItem;
