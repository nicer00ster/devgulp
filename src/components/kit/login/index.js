import { connect } from "react-redux";
import { useTrail } from "react-spring";
import { StyledLogin, StyledLoginForm, StyledLoginCaret } from "./login.styles";
import Loading from "../loading";
import { StyledInput, StyledFormHeading } from "../form/form.styles";
import { useInput } from "../../../hooks";
import { login } from "../../../redux/actions";

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

  return trail.map(({ x, height, ...rest }, index) => (
    <StyledLogin
      key={index}
      style={{
        ...rest,
        transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
      }}
      disabled={!props.loginMenuOpen || props.user.isLoggingIn}
      aria-busy={props.user.isLoggingIn}
    >
      <StyledFormHeading>Login</StyledFormHeading>
      <StyledLoginForm
        onSubmit={e => {
          e.preventDefault();
          props.login(username, password);
        }}
      >
        <StyledInput>
          <input
            type="text"
            name="username"
            id="username"
            style={usernameError ? { borderBottom: "1px solid tomato" } : {}}
            {...bindUsername}
          />
          <span className="bar" />
          <label
            htmlFor="username"
            style={usernameError ? { color: "tomato" } : {}}
          >
            Username
          </label>
        </StyledInput>
        <StyledInput>
          <input
            type="password"
            name="password"
            id="password"
            style={passwordError ? { borderBottom: "1px solid tomato" } : {}}
            {...bindPassword}
          />
          <span className="bar" />
          <label
            htmlFor="password"
            style={passwordError ? { color: "tomato" } : {}}
          >
            Password
          </label>
        </StyledInput>
        <button type="submit">login</button>
      </StyledLoginForm>
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
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
