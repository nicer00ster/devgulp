import { useContext } from 'react';
import { connect } from 'react-redux';
import { AppContext } from '../notifications/provider';
import { StyledForm, StyledFormHeading } from './form.styles';
import { register, resetPassword } from '../../../redux/actions';
import { useInput } from '../../../hooks';
import Button from '../button';
import Input from '../input';
import Loading from '../loading';

function Form(props) {
  const { addNotification } = useContext(AppContext);
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

  function handleRegister(e) {
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
      addNotification('Username must be greater than 4 characters!', 'error');
      return;
    }

    if (password !== verifyPassword) {
      setPasswordError(true);
      setVerifyPasswordError(true);
      addNotification('Passwords must match!', 'error');
      return;
    }

    if (!username || !email || !password || !verifyPassword) {
      addNotification('Make sure to fill out all the fields!', 'error');
      return;
    }

    props.register(username, email, password, verifyPassword);
  }

  function handleReset(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setVerifyPasswordError(false);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!verifyPassword) {
      setVerifyPasswordError(true);
    }

    if (password !== verifyPassword) {
      setPasswordError(true);
      setVerifyPasswordError(true);
      addNotification('Passwords must match!', 'error');
      return;
    }

    if (!email || !password || !verifyPassword) {
      addNotification('Make sure to fill out all the fields!', 'error');
      return;
    }

    props.resetPassword(username, email, password, verifyPassword);
  }

  return (
    <StyledForm
      onSubmit={e => {
        if (props.type === 'register') {
          handleRegister(e);
        } else if (props.type === 'reset') {
          handleReset(e);
        }
      }}>
      <fieldset
        disabled={props.user.isRegistering}
        aria-busy={props.user.isRegistering}>
        <StyledFormHeading>{props.label}</StyledFormHeading>
        {props.type === 'register' && (
          <Input
            type="text"
            name="username"
            label="Username"
            styles={{ margin: '5rem 0' }}
            error={usernameError}
            bind={bindUsername}
          />
        )}
        <Input
          type="email"
          name="email"
          label="Email"
          styles={{ margin: '5rem 0' }}
          error={emailError}
          bind={bindEmail}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          styles={{ margin: '5rem 0' }}
          error={passwordError}
          bind={bindPassword}
        />
        <Input
          type="password"
          name="verifyPassword"
          label="Confirm Password"
          styles={{ margin: '5rem 0' }}
          error={verifyPasswordError}
          bind={bindVerifyPassword}
        />
        <Button type="submit">Submit</Button>
      </fieldset>
      {props.isRegistering && <Loading />}
    </StyledForm>
  );
}

const mapStateToProps = ({ user, root }) => ({
  user,
  isRegistering: user.isRegistering,
  isResettingPassword: root.isResettingPassword,
});

const mapDispatchToProps = {
  register,
  resetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
