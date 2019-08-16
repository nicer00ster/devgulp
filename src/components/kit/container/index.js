import { connect } from 'react-redux';
import {
    StyledContainer,
} from './container.styles';

function Container(props) {
    return (
        <StyledContainer
            userMenuOpen={props.userMenuOpen}
            loginMenuOpen={props.loginMenuOpen}>
            {props.children}
        </StyledContainer>
    );
}

const mapStateToProps = ({ root }) => ({
    loginMenuOpen: root.loginMenuOpen,
    userMenuOpen: root.userMenuOpen,
});

export default connect(mapStateToProps, null)(Container);
