import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';
import debounce from 'lodash.debounce';
import {
  StyledNotifications,
  StyledNotificationOuter,
  StyledNotificationInner,
  StyledNotificationContent,
  StyledNotificationButton,
  StyledNotificationButtonClose,
  StyledNotificationDuration,
} from './notifications.styles';

function Notifications({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children,
}) {
  const [refMap] = useState(() => new WeakMap());
  const [cancelMap] = useState(() => new WeakMap());
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const [offlineRef, setOfflineRef] = useState();

  const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0, height: 0, life: '100%', zIndex: 1 },
    enter: item => async (next, cancel) => {
      if (item.connection === 'offline') {
        const offlineNotification = item.connection === 'offline' ? item : null;
        setOfflineRef(offlineNotification);
      }
      if (item.connection === 'online') {
        cancelMap.has(offlineRef) && cancelMap.get(offlineRef)();
        cancelMap.set(offlineRef, cancel);
        await next({ life: '0%' });
        await next({ opacity: 0 });
        await next({ height: 0 });
      }
      await next({
        opacity: 1,
        height: refMap.get(item).offsetHeight,
        zIndex: -item.key,
      });
    },
    leave: item => async (next, cancel) => {
      cancelMap.set(item, cancel);
      await next({ life: '0%' });
      await next({ opacity: 0 });
      await next({ height: 0 });
    },
    onRest: item => setItems(state => state.filter(i => i.key !== item.key)),
    onDestroyed: () => setIndex(index - 1),
    config: (item, state) =>
      state === 'leave'
        ? [
            {
              duration: item.connection === 'offline' ? Infinity : timeout,
            },
            config,
            config,
          ]
        : config,
  });

  useEffect(
    () =>
      void children((msg, appearance, connection) => {
        setIndex(index + 1);
        setItems(state => [...state, { key: index, msg, appearance, connection }]);
      }),
    [index, items],
  );

  return (
    <StyledNotifications
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={debounce(() => setIsHovered(false), 500)}>
      {transitions.map(({ item, key, props: { life, ...style } }) => {
        return (
          <StyledNotificationOuter key={key} style={style}>
            <StyledNotificationInner>
              <StyledNotificationContent
                className={item.appearance}
                ref={ref => ref && refMap.set(item, ref)}>
                {item.connection === undefined && (
                  <StyledNotificationDuration
                    className={item.appearance}
                    style={{ right: life }}
                  />
                )}
                <p>{item.msg}</p>
                <StyledNotificationButton
                  onClick={e => {
                    e.stopPropagation();
                    cancelMap.has(item) && cancelMap.get(item)();
                  }}>
                  <StyledNotificationButtonClose />
                </StyledNotificationButton>
              </StyledNotificationContent>
            </StyledNotificationInner>
          </StyledNotificationOuter>
        );
      })}
    </StyledNotifications>
  );
}

const mapStateToProps = ({ root }) => ({
  online: root.online,
});

export default connect(
  mapStateToProps,
  null,
)(Notifications);
