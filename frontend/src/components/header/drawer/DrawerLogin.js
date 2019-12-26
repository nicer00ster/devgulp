import { connect } from 'react-redux';
import {
  StyledLoginForm,
  StyledSegwayContainer,
  StyledSegwaySignup,
} from '../../kit/login/login.styles';
import { login, toggleSignUpMenu } from '../../../redux/actions';
import { useInput } from '../../../hooks';
import EnhancedLink from '../EnhancedLink';
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
      <StyledSegwaySignup>
        Not a member yet?
        <EnhancedLink
          isButton
          isAuthenticated={true}
          onClick={() => props.toggleSignUpMenu()}>
          Sign up
        </EnhancedLink>
      </StyledSegwaySignup>
      <Input
        type="text"
        name="drawerUsername"
        label="Username"
        styles={{ margin: '4rem 0' }}
        error={usernameError}
        bind={bindUsername}
      />
      <Input
        type="password"
        name="drawerPassword"
        label="Password"
        styles={{ margin: '4rem 0' }}
        error={passwordError}
        bind={bindPassword}
      />
      <Button type="submit">Login</Button>
    </StyledLoginForm>
  );
}

const mapDispatchToProps = {
  login,
  toggleSignUpMenu,
};

export default connect(
  null,
  mapDispatchToProps,
)(DrawerLogin);
