import { useEffect } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { fetchUser } from "../../redux/actions";
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
  }, []);
  if (props.user.checkingCredentials) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <LayoutStyles
        userMenuOpen={props.root.userMenuOpen}
        loginMenuOpen={props.root.loginMenuOpen}
      >
        <GlobalStyles />
        <Header />
        {props.children}
        <Footer />
      </LayoutStyles>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ root, user }) => ({
  root,
  user
});

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
