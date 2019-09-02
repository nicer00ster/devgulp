import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  LayoutStyles,
  GlobalStyles,
  breakpoints,
  colors,
  effects,
  mediaQuery,
} from './layout.styles';
import { fetchUser, screenResize } from '../../redux/actions';
import { AppContext } from '../kit/notifications/provider';
import Header from '../header';
import Footer from '../footer';
import Loading from '../../components/kit/loading';
import Background from '../../components/kit/background';
import Notifications from '../kit/notifications';

const theme = {
  breakpoints,
  mediaQuery,
  colors,
  effects,
};

function Layout(props) {
  const { state, addNotification } = useContext(AppContext);

  function screenResize() {
    props.screenResize(window.innerWidth);
  }

  useEffect(() => {
    props.fetchUser();
    screenResize();
    window.addEventListener('resize', screenResize);

    return () => window.removeEventListener('resize', screenResize);
  }, []);

  // Listener for error messages.
  useEffect(() => {
    if (props.user.hasError) {
      addNotification(props.user.errorMessage);
    }
  }, [props.user.hasError]);

  if (props.user.checkingCredentials) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <>
        <Background
          drawerOpen={props.root.drawerOpen}
          userMenuOpen={props.root.userMenuOpen}
          loginMenuOpen={props.root.loginMenuOpen}
        />
        <Header />
        <LayoutStyles
          drawerOpen={props.root.drawerOpen}
          userMenuOpen={props.root.userMenuOpen}
          loginMenuOpen={props.root.loginMenuOpen}>
          <Notifications
            children={add => (state.notificationRef.current = add)}
          />
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
  user,
});

const mapDispatchToProps = {
  fetchUser,
  screenResize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
