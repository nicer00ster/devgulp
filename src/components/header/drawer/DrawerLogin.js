import { connect } from 'react-redux';
import {StyledLoginForm} from "../../kit/login/login.styles";
import {StyledFormHeading, StyledInput} from "../../kit/form/form.styles";
import { login } from '../../../redux/actions';
import Button from "../../kit/button";
import { useInput } from "../../../hooks";

function DrawerLogin(props) {
    const {
        value: username,
        bind: bindUsername,
        reset: resetUsername,
        setError: setUsernameError,
        hasError: usernameError,
    } = useInput('');
    const {
        value: password,
        bind: bindPassword,
        reset: resetPassword,
        setError: setPasswordError,
        hasError: passwordError,
    } = useInput('');

    function handleLogin() {
        setUsernameError(false);
        setPasswordError(false);

        if(!username) {
            setUsernameError(true);
        }
        if(!password) {
            setPasswordError(true);
        }
        if(!username || !password) {
            return;
        }
        props.login(username, password);
    }

    return (
        <StyledLoginForm
            onSubmit={e => {
                e.preventDefault();
                handleLogin();
            }}>
            <StyledInput>
                <input
                    type="text"
                    name="loginUsername"
                    id="loginUsername"
                    autoFocus
                    style={usernameError ? { borderBottom: '1px solid tomato' } : {}}
                    {...bindUsername}
                />
                <span className="bar" />
                <label
                    htmlFor="loginUsername"
                    style={usernameError ? { color: 'tomato' } : {}}>
                    Username
                </label>
            </StyledInput>
            <StyledInput>
                <input
                    type="password"
                    name="loginPassword"
                    id="loginPassword"
                    style={passwordError ? { borderBottom: '1px solid tomato' } : {}}
                    {...bindPassword}
                />
                <span className="bar" />
                <label
                    htmlFor="loginPassword"
                    style={passwordError ? { color: 'tomato' } : {}}>
                    Password
                </label>
            </StyledInput>
            <Button type="submit">Login</Button>
        </StyledLoginForm>
    )
}

const mapDispatchToProps = {
    login,
};

export default connect(null, mapDispatchToProps)(DrawerLogin);
