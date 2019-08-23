import {useEffect} from 'react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import {fetchPost} from '../redux/actions';
import SinglePost from '../components/kit/singlePost';
import Container from '../components/kit/container';

function Post(props) {
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        props.fetchPost(id);
    }, []);

    return (
        <Container>
            <SinglePost post={props.post}/>
        </Container>
    );
}

const mapStateToProps = ({post}) => ({
    post,
});

const mapDispatchToProps = {
    fetchPost,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
