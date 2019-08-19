import { useEffect } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { fetchUser, screenResize } from "../../redux/actions";
import Header from "../header";
import Footer from "../footer";
import Loading from "../../components/kit/loading";
import {
  LayoutStyles,
  GlobalStyles,
  breakpoints,
  colors,
  effects,
  mediaQuery
} from "./layout.styles";

const theme = {
  breakpoints,
  mediaQuery,
  colors,
  effects
};

function Layout(props) {
  useEffect(() => {
    props.fetchUser();
    window.addEventListener('resize', props.screenResize(window.innerWidth));
    return () => window.removeEventListener('resize', props.screenResize(window.innerWidth));
  }, []);
  if (props.user.checkingCredentials) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <>
      <Header />
      <LayoutStyles
        userMenuOpen={props.root.userMenuOpen}
        loginMenuOpen={props.root.loginMenuOpen}
      >
        <GlobalStyles />
        {props.children}
      </LayoutStyles>
      <Footer />
      </>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ root, user }) => ({
  root,
  user
});

const mapDispatchToProps = {
  fetchUser,
  screenResize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
