import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {fetchUsers, openLoginMenu} from '../redux/actions';
import EnhancedUsers from '../components/kit/users';
import Container from '../components/kit/container';

function Users(props) {
    const router = useRouter();

    useEffect(() => {
        if (!props.cookie) {
            router.push('/');
            //  TODO: Warn user to login in order to view this page.
        } else {
            props.fetchUsers();
        }
    });
    return (
        <Container>
            <EnhancedUsers/>
        </Container>
    );
}

const mapDispatchToProps = {
    fetchUsers,
    openLoginMenu,
};

export default connect(
    null,
    mapDispatchToProps,
)(Users);
