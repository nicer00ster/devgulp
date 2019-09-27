import Link from 'next/link';
import { StyledFeaturedPost, StyledFeaturedPostImage } from './posts.styles.js';
import {
  StyledDateAuthor,
  StyledDateAuthorDivider,
  StyledPostAuthor,
  StyledPostCommentCount,
  StyledPostContent,
  StyledPostDateStamp,
  StyledPostExcerpt,
  StyledPostTaxonomies,
  StyledPostTaxonomyItem,
  StyledPostTitle,
} from './posts.styles';
import moment from 'moment';
import { getTaxonomyIcon } from '../../../utils';

function FeaturedPost(props) {
  return (
    <StyledFeaturedPost>
      <Link href="/post/[id]" as={`/post/${props.post.id}`}>
        <a>
          <StyledPostTaxonomies>
            {props.post._embedded['wp:term'] &&
              props.post._embedded['wp:term']['0']['0'].name !== 'Uncategorized' &&
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
            <StyledPostTitle size={36}>
              {props.post.title.rendered || props.post.title}
            </StyledPostTitle>
            <StyledPostExcerpt
              size={16}
              dangerouslySetInnerHTML={{
                __html: props.post.excerpt.rendered,
              }}
            />
            <StyledPostCommentCount size={16}>
              <i className="fal fa-comment-lines" />
              <span>
                {props.post.comments.length} comment
                {props.post.comments.length === 1 ? '' : 's'}
              </span>
            </StyledPostCommentCount>
            <StyledDateAuthor size={16}>
              <StyledPostDateStamp>
                {moment(props.post.date).format('MMM Do')}
              </StyledPostDateStamp>
              <StyledDateAuthorDivider />
              <StyledPostAuthor>
                {props.post._embedded['author']['0'].name}
              </StyledPostAuthor>
            </StyledDateAuthor>
          </StyledPostContent>
          <StyledFeaturedPostImage
            className="post-image"
            src={
              props.post._embedded && props.post._embedded['wp:featuredmedia']
                ? props.post._embedded['wp:featuredmedia']['0'].source_url
                : '/static/images/default_post.jpg'
            }
          />
        </a>
      </Link>
    </StyledFeaturedPost>
  );
}

export default FeaturedPost;
