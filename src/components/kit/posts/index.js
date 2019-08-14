import { useState } from "react";
import { useTransition } from "react-spring";
import Link from "next/link";
import { connect } from "react-redux";
import moment from "moment";
import {
  StyledPosts,
  StyledPost,
  StyledPostContent,
  StyledPostTaxonomies,
  StyledPostTaxonomyItem,
  StyledPostTitle,
  StyledDateAuthor,
  StyledDateAuthorDivider,
  StyledPostAuthor,
  StyledPostExcerpt,
  StyledPostDateStamp,
  StyledPostImage,
  StyledNoResults
} from "./posts.styles";
import Loading from "../loading";
import { getTaxonomyIcon } from "../../../utils";

function EnhancedPosts(props) {
  const filteredPosts = props.posts.filter(post => post.isFiltered);
  const currentFilter = props.categories.map(category =>
    category.id === props.taxonomyFilter ? category.name : null
  );

  const transitions = useTransition(props.posts, post => post.id, {
    config: {
      duration: 100,
    },
    trail: 25,
    from: { opacity: 0, transform: `translateY(100px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity:  0, transform: `translateY(100px)` },
    update: item => ({ opacity: item.isFiltered ? 1 : 0, transform: item.isFiltered ? `translateY(0)` : `translateY(100px)` }),
  });

  return (
    <>
      <StyledPosts>
        {props.posts &&
          transitions.map(post => post.item.isFiltered && (
              <StyledPost key={post.item.id} style={{ opacity: post.props.opacity, transform: post.props.transform }}>
                <Link href={`/post?id=${post.item.id}`}>
                  <a>
                    <StyledPostTaxonomies>
                      {post.item._embedded["wp:term"]["0"]["0"].name !==
                      "Uncategorized" &&
                      post.item._embedded["wp:term"]["0"].map((term, index) => (
                          <StyledPostTaxonomyItem key={index}>
                              <span
                                  className={getTaxonomyIcon(
                                      post.item._embedded["wp:term"]["0"][index].name
                                  )}
                              />
                          </StyledPostTaxonomyItem>
                      ))}
                    </StyledPostTaxonomies>
                    <StyledPostContent>
                      <StyledPostTitle>{post.item.title.rendered}</StyledPostTitle>
                      <StyledPostExcerpt
                          dangerouslySetInnerHTML={{
                            __html: post.item.excerpt.rendered
                          }}
                      />
                      <StyledDateAuthor>
                        <StyledPostDateStamp>
                          {moment(post.item.date).format("MMM Do")}
                        </StyledPostDateStamp>
                        <StyledDateAuthorDivider />
                        <StyledPostAuthor>
                          {post.item._embedded["author"]["0"].name}
                        </StyledPostAuthor>
                      </StyledDateAuthor>
                    </StyledPostContent>
                    <StyledPostImage
                        className="post-image"
                        src={
                          post.item._embedded && post.item._embedded["wp:featuredmedia"]
                            ? post.item._embedded["wp:featuredmedia"]["0"].source_url
                            : "/static/images/default_post.jpeg"
                        }
                    />
                  </a>
                </Link>
              </StyledPost>
          ))}
        {!props.posts.length && props.isFetchingPosts && <Loading />}
      </StyledPosts>
      {props.posts.length && props.posts && filteredPosts.length === 0 && (
        <StyledNoResults>
          No articles have been posted about {currentFilter}. Be the{" "}
          <Link href="/publish">
            <a>first</a>
          </Link>
          !
        </StyledNoResults>
      )}
    </>
  );
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  categories: posts.categories,
  taxonomyFilter: posts.taxonomyFilter
});

export default connect(
  mapStateToProps,
  null
)(EnhancedPosts);
