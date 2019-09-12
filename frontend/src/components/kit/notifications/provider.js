import React, { useState, useRef, createContext } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [notification, setNotification] = useState('');

  const ref = useRef(null);

  return (
    <AppContext.Provider
      value={{
        state: {
          message: notification,
          notificationRef: ref,
        },
        addNotification: (message, appearance) => ref.current(message, appearance),
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

const AppConsumer = AppContext.Consumer;

export default AppProvider;
export { AppConsumer, AppContext };