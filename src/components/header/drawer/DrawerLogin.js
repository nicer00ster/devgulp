import { connect } from 'react-redux';
import { StyledLoginForm } from '../../kit/login/login.styles';
import { login } from '../../../redux/actions';
import { useInput } from '../../../hooks';
import Button from '../../kit/button';
import Input from '../../kit/input';

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

    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!username || !password) {
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
      <Input
        type="text"
        name="drawerUsername"
        label="Username"
        error={usernameError}
        bind={bindUsername}
      />
      <Input
        type="password"
        name="drawerPassword"
        label="Password"
        error={passwordError}
        bind={bindPassword}
      />
      <Button type="submit">Login</Button>
    </StyledLoginForm>
  );
}

const mapDispatchToProps = {
  login,
};

export default connect(
  null,
  mapDispatchToProps,
)(DrawerLogin);
