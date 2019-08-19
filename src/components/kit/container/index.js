import { connect } from 'react-redux';
import {
    StyledContainer,
} from './container.styles';

function Container(props) {
    return (
        <StyledContainer
            isFetchingPosts={props.isFetchingPosts}
            userMenuOpen={props.userMenuOpen}
            loginMenuOpen={props.loginMenuOpen}>
            {props.children}
        </StyledContainer>
    );
}

const mapStateToProps = ({ root, posts }) => ({
    loginMenuOpen: root.loginMenuOpen,
    userMenuOpen: root.userMenuOpen,
    isFetchingPosts: posts.isFetchingPosts,
});

export default connect(mapStateToProps, null)(Container);
