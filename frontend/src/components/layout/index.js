import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import io from 'socket.io-client';
import {
  LayoutStyles,
  GlobalStyles,
  breakpoints,
  colors,
  effects,
  mediaQuery,
} from './layout.styles';
import {
  fetchUser,
  screenResize,
  chatConnect,
  chatDisconnect,
} from '../../redux/actions';
import { AppContext } from '../kit/notifications/provider';
import * as types from '../../redux/constants';
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
  const { id, username } = props.user;

  function screenResize() {
    props.screenResize(window.innerWidth);
  }

  const socket = io('http://localhost:9000', {
    reconnect: true,
    forceNew: true,
    transports: ['websocket'],
    reconnectionDelay: 5000,
    query: {
      userId: id,
      name: username,
    },
  });
  //
  // socket.on('reconnect_attempt', () => {
  //   socket.io.opts.transports = ['polling', 'websocket'];
  // });

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
    socket.emit(types.CLIENT_CONNECTION, username);

    socket.on(types.SERVER_CONNECTION, () => {
      props.chatConnect();
      console.log('Connected: ', socket);
    });

    socket.on(types.SERVER_DISCONNECTION, reason => {
      socket.emit(types.CLIENT_DISCONNECTION, username);
      console.log(reason);
      props.chatDisconnect();
      console.log('Disconnected: ', socket);
    });
  }, []);

  // Socket listener for chat messages.
  useEffect(() => {
    if (props.chat.message !== '') {
      socket.emit('chat_message', {
        userId: id,
        message: props.chat.message,
        messagingUser: props.chat.messagingUser.name,
      });
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
          <Chat
            socket={socket}
            chatConnect={props.chatConnect}
            chatDisconnect={props.chatDisconnect}
            connected={props.chat.connected}
            user={props.user}
          />
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
  chatConnect,
  chatDisconnect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
