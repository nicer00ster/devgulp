import { useContext } from 'react';
import { connect } from 'react-redux';
import { useTrail } from 'react-spring';
import { StyledLogin, StyledLoginForm, StyledLoginCaret } from './login.styles';
import { StyledFormHeading } from '../form/form.styles';
import { useInput } from '../../../hooks';
import { login, toggleLoginMenu } from '../../../redux/actions';
import { AppContext } from '../notifications/provider';
import Loading from '../loading';
import Button from '../button';
import Input from '../input';

const config = { mass: 5, tension: 2000, friction: 100 };

function Login(props) {
  const { addNotification } = useContext(AppContext);
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

  const trail = useTrail(1, {
    config,
    opacity: props.loginMenuOpen ? 1 : 0,
    x: props.loginMenuOpen ? 5 : 20,
    height: props.loginMenuOpen ? 80 : 0,
    pointerEvents: props.loginMenuOpen ? 'all' : 'none',
    from: {
      opacity: 0,
      x: 20,
      height: 0,
    },
  });

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
      addNotification('Make sure to enter a username & password!');
      return;
    }

    props.login(username, password);
  }

  return trail.map(({ x, height, opacity, ...rest }, index) => (
    <StyledLogin
      key={index}
      style={{
        transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
        opacity: !props.user.isLoggingIn && opacity,
        ...rest,
      }}
      disabled={!props.loginMenuOpen || props.user.isLoggingIn}
      aria-busy={props.user.isLoggingIn}>
      {props.loginMenuOpen && (
        <StyledLoginForm
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}>
          <StyledFormHeading>Login</StyledFormHeading>
          <Input
            type="text"
            name="loginUsername"
            label="Username"
            autoFocus={true}
            styles={{ margin: '5rem 0' }}
            error={usernameError}
            bind={bindUsername}
          />
          <Input
            type="password"
            name="loginPassword"
            label="Password"
            styles={{ margin: '5rem 0' }}
            error={passwordError}
            bind={bindPassword}
          />
          <Button type="submit">Login</Button>
        </StyledLoginForm>
      )}
      <StyledLoginCaret />
      {props.user.isLoggingIn && <Loading />}
    </StyledLogin>
  ));
}

const mapStateToProps = ({ root, user }) => ({
  loginMenuOpen: root.loginMenuOpen,
  user,
});

const mapDispatchToProps = {
  login,
  toggleLoginMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
