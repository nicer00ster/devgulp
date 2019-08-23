import {connect} from 'react-redux';
import {StyledForm, StyledFormHeading, StyledInput} from './form.styles';
import {register} from '../../../redux/actions';
import {useInput} from '../../../hooks';
import Button from '../button';

function Form(props) {
    const {
        value: username,
        bind: bindUsername,
        reset: resetUsername,
        setError: setUsernameError,
        hasError: usernameError,
    } = useInput('');
    const {
        value: email,
        bind: bindEmail,
        reset: resetEmail,
        setError: setEmailError,
        hasError: emailError,
    } = useInput('');
    const {
        value: password,
        bind: bindPassword,
        reset: resetPassword,
        setError: setPasswordError,
        hasError: passwordError,
    } = useInput('');
    const {
        value: verifyPassword,
        bind: bindVerifyPassword,
        reset: resetVerifyPassword,
        setError: setVerifyPasswordError,
        hasError: verifyPasswordError,
    } = useInput('');

    const handleSubmit = e => {
        e.preventDefault();

        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
        setVerifyPasswordError(false);

        if (!username) {
            setUsernameError(true);
        }
        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (!verifyPassword) {
            setVerifyPasswordError(true);
        }

        if (username.length <= 4) {
            setUsernameError(true);
            return;
        }

        if (password !== verifyPassword) {
            setPasswordError(true);
            setVerifyPasswordError(true);
            return;
        }

        if (!username || !email || !password || !verifyPassword) {
            console.log('Make sure to fill out all the fields!');
            return;
        }

        props.register(username, email, password, verifyPassword);
    };

    return (
        <StyledForm onSubmit={e => handleSubmit(e)}>
            <fieldset
                disabled={props.user.isRegistering}
                aria-busy={props.user.isRegistering}>
                <StyledFormHeading>Register</StyledFormHeading>
                <StyledInput>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoFocus
                        style={usernameError ? {borderBottom: '1px solid tomato'} : {}}
                        {...bindUsername}
                    />
                    <span className="bar"/>
                    <label
                        htmlFor="username"
                        style={usernameError ? {color: 'tomato'} : {}}>
                        Username
                    </label>
                </StyledInput>
                <StyledInput>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        style={emailError ? {borderBottom: '1px solid tomato'} : {}}
                        {...bindEmail}
                    />
                    <span className="bar"/>
                    <label htmlFor="email" style={emailError ? {color: 'tomato'} : {}}>
                        Email
                    </label>
                </StyledInput>
                <StyledInput>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        style={passwordError ? {borderBottom: '1px solid tomato'} : {}}
                        {...bindPassword}
                    />
                    <span className="bar"/>
                    <label
                        htmlFor="password"
                        style={passwordError ? {color: 'tomato'} : {}}>
                        Password
                    </label>
                </StyledInput>
                <StyledInput>
                    <input
                        type="password"
                        name="password"
                        id="verifyPassword"
                        style={
                            verifyPasswordError ? {borderBottom: '1px solid tomato'} : {}
                        }
                        {...bindVerifyPassword}
                    />
                    <span className="bar"/>
                    <label
                        htmlFor="verifyPassword"
                        style={verifyPasswordError ? {color: 'tomato'} : {}}>
                        Verify Password
                    </label>
                </StyledInput>
                <Button type="submit">Submit</Button>
            </fieldset>
        </StyledForm>
    );
}

const mapStateToProps = ({user}) => ({
    user,
});

const mapDispatchToProps = {
    register,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form);
