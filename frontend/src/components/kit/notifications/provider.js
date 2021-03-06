import React, { useState, useRef, createContext } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const ref = useRef(null);
  const [notification, setNotification] = useState('');

  return (
    <AppContext.Provider
      value={{
        state: {
          message: notification,
          notificationRef: ref,
        },
        addNotification: (message, appearance, connection) =>
          ref.current(message, appearance, connection),
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

const AppConsumer = AppContext.Consumer;

export default AppProvider;
export { AppConsumer, AppContext };
