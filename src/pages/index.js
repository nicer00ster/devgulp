import {useEffect} from 'react';
import {connect} from 'react-redux';

import Container from '../components/kit/container';
import EnhancedPosts from '../components/kit/posts';
import Editor from '../components/kit/editor';
import Hero from '../components/kit/hero';
import Loading from '../components/kit/loading';
import {fetchCategories, fetchPosts, fetchTotalPosts} from '../redux/actions';

function Index(props) {
    useEffect(() => {
        props.fetchTotalPosts();
        props.fetchPosts(props.postCount + 2);
        props.fetchCategories();
    }, []);
    return (
        <>
            <Hero>
                <Editor
                    lines={[
                        'Welcome to DevGulp',
                        'Enjoy hassle-free content',
                        "Deliver value to what you're passionate about.",
                    ]}
                />
            </Hero>
            <Container>
                <EnhancedPosts/>
                {props.isFetchingPosts && <Loading/>}
            </Container>
        </>
    );
}

const mapStateToProps = ({posts}) => ({
    isFetchingPosts: posts.isFetchingPosts,
    postCount: posts.postCount,
});

const mapDispatchToProps = {
    fetchPosts,
    fetchTotalPosts,
    fetchCategories,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);
