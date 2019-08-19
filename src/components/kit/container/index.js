import { connect } from 'react-redux';
import {
    StyledContainer,
} from './container.styles';

function Container(props) {
    return (
        <StyledContainer
            isSearching={props.isSearching}
            isFetchingPosts={props.isFetchingPosts}
            userMenuOpen={props.userMenuOpen}
            loginMenuOpen={props.loginMenuOpen}>
            {props.children}
        </StyledContainer>
    );
}

const mapStateToProps = ({ root, posts, search }) => ({
    loginMenuOpen: root.loginMenuOpen,
    userMenuOpen: root.userMenuOpen,
    isFetchingPosts: posts.isFetchingPosts,
    isSearching: search.isSearching,
});

export default connect(mapStateToProps, null)(Container);
