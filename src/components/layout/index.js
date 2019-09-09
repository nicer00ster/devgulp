import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import io from "socket.io-client";
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
import Chat from '../kit/chat';
import Meta from '../meta';

const theme = {
  breakpoints,
  mediaQuery,
  colors,
  effects,
};

function Layout(props) {
  const { state, addNotification } = useContext(AppContext);
  const { cookie } = props;

  function screenResize() {
    props.screenResize(window.innerWidth);
  }

  const socket = io('http://localhost:3000', {
    reconnect: true,
    forceNew: true,
    transports: ['websocket'],
    query: {
      token: cookie,
    }
  });

  useEffect(() => {
    props.fetchUser();
    screenResize();
    window.addEventListener('resize', screenResize);

    return () => window.removeEventListener('resize', screenResize);
  }, []);

  // Listener for error messages.
  useEffect(() => {
    if (props.user.hasError) {
      addNotification(props.user.errorMessage, 'error');
    }
    if (props.post.hasError) {
      addNotification(props.post.errorMessage, 'error');
    }
  }, [props.user.hasError, props.post.hasError]);

  // Websocket connection.
  useEffect(() => {
    socket.on('connect', (req) => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected')
    });
  }, []);

  // Socket listener for chat messages.
  useEffect(() => {
    if(props.chat.message !== '') {
      socket.emit('chat_message', { token: cookie, message: props.chat.message, messagingUser: props.chat.messagingUser.name });
    }
  }, [props.chat.message]);

  if (props.user.checkingCredentials) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <>
        <Meta />
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
          <Notifications children={add => (state.notificationRef.current = add)} />
          <GlobalStyles />
          {props.children}
          <Chat user={props.user} />
        </LayoutStyles>
        <Footer />
      </>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ root, user, post, chat }) => ({
  root,
  user,
  post,
  chat,
});

const mapDispatchToProps = {
  fetchUser,
  screenResize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
