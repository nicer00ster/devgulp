import { connect } from "react-redux";
import { useTrail } from "react-spring";
import { StyledLogin, StyledLoginForm, StyledLoginCaret } from "./login.styles";
import { StyledInput, StyledFormHeading } from "../form/form.styles";
import { useInput } from "../../../hooks";
import { login, toggleLoginMenu } from "../../../redux/actions";
import Loading from "../loading";
import Button from '../button';

const config = { mass: 5, tension: 2000, friction: 100 };

function Login(props) {
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
    setError: setUsernameError,
    hasError: usernameError
  } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
    setError: setPasswordError,
    hasError: passwordError
  } = useInput("");

  const trail = useTrail(1, {
    config,
    opacity: props.loginMenuOpen ? 1 : 0,
    x: props.loginMenuOpen ? 0 : 20,
    height: props.loginMenuOpen ? 80 : 0,
    pointerEvents: props.loginMenuOpen ? "all" : "none",
    from: {
      opacity: 0,
      x: 20,
      height: 0
    }
  });

  return trail.map(({ x, height, opacity, ...rest }, index) => (
    <StyledLogin
      key={index}
      style={{
        transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
        opacity: !props.user.isLoggingIn && opacity,
        ...rest,
      }}
      disabled={!props.loginMenuOpen || props.user.isLoggingIn}
      aria-busy={props.user.isLoggingIn}
    >
      <StyledFormHeading>Login</StyledFormHeading>
      {props.loginMenuOpen && (
          <StyledLoginForm
              onSubmit={e => {
                e.preventDefault();
                props.login(username, password);
              }}>
            <StyledInput>
              <input
                  type="text"
                  name="loginUsername"
                  id="loginUsername"
                  autoFocus
                  style={usernameError ? { borderBottom: "1px solid tomato" } : {}}
                  {...bindUsername}
              />
              <span className="bar" />
              <label
                  htmlFor="loginUsername"
                  style={usernameError ? { color: "tomato" } : {}}
              >
                Username
              </label>
            </StyledInput>
            <StyledInput>
              <input
                  type="password"
                  name="loginPassword"
                  id="loginPassword"
                  style={passwordError ? { borderBottom: "1px solid tomato" } : {}}
                  {...bindPassword}
              />
              <span className="bar" />
              <label
                  htmlFor="loginPassword"
                  style={passwordError ? { color: "tomato" } : {}}
              >
                Password
              </label>
            </StyledInput>
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
  user
});

const mapDispatchToProps = {
  login,
  toggleLoginMenu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
