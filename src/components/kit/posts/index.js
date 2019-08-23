import {useEffect} from 'react';
import {useTransition} from 'react-spring';
import Link from 'next/link';
import {connect} from 'react-redux';
import debounce from 'lodash.debounce';
import {StyledNoResults, StyledPosts,} from './posts.styles';
import {fetchPosts} from '../../../redux/actions';
import PostItem from './PostItem';

function EnhancedPosts(props) {
    const filteredPosts = props.posts.filter(post => post.isFiltered);
    const currentFilter = props.categories.map(category =>
        category.id === props.taxonomyFilter ? category.name : null,
    );

    const fetchPosts = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        if (props.postCount >= props.totalPosts) return;
        props.fetchPosts(props.postCount + 2);
    }, 500);

    useEffect(() => {
        window.addEventListener('scroll', fetchPosts);
        return () => window.removeEventListener('scroll', fetchPosts);
    }, [fetchPosts]);

    const transitions = useTransition(props.posts, post => post.id, {
        config: {
            duration: 100,
        },
        trail: 25,
        from: {opacity: 0, transform: `translateY(100px)`},
        enter: {opacity: 1, transform: `translateY(0)`},
        leave: {opacity: 0, transform: `translateY(100px)`},
        update: item => ({
            opacity: item.isFiltered ? 1 : 0,
            transform: item.isFiltered ? `translateY(0)` : `translateY(100px)`,
        }),
    });

    return (
        <>
            <StyledPosts>
                {props.posts &&
                transitions.map(
                    post =>
                        post.item.isFiltered && (
                            <PostItem
                                key={post.item.id}
                                post={post.item}
                                opacity={post.props.opacity}
                                transform={post.props.transform}
                            />
                        ),
                )}
            </StyledPosts>
            {props.posts.length && props.posts && filteredPosts.length === 0 ? (
                <StyledNoResults>
                    No articles have been posted about {currentFilter}. Be the{' '}
                    <Link href="/publish">
                        <a>first</a>
                    </Link>
                    !
                </StyledNoResults>
            ) : null}
        </>
    );
}

const mapStateToProps = ({posts}) => ({
    posts: posts.posts,
    categories: posts.categories,
    taxonomyFilter: posts.taxonomyFilter,
    postCount: posts.postCount,
    isFetchingPosts: posts.isFetchingPosts,
    totalPosts: posts.totalPosts,
});

const mapDispatchToProps = {
    fetchPosts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EnhancedPosts);
