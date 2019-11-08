import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const events = [MOUSEDOWN, TOUCHSTART];

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  return {
    value,
    setValue,
    reset: () => {
      setValue('');
      setError(false);
    },
    setError: err => setError(err),
    bind: {
      value,
      onChange: e => {
        setValue(e.target.value);
      },
    },
    hasError: error,
  };
};

export function useLatest(val) {
  const ref = useRef(val);

  useEffect(() => {
    ref.current = val;
  });

  return ref;
}

export function useOnClickOutside(ref, handler) {
  const getOptions = event => {
    if (event !== TOUCHSTART) {
      return;
    }
  };

  const handlerRef = useLatest(handler);

  useEffect(() => {
    if (!handler) {
      return;
    }
    const listener = event => {
      if (
        !ref.current ||
        !handlerRef.current ||
        ref.current.contains(event.target)
      ) {
        return;
      }
      handlerRef.current(event);
    };
    events.forEach(event => {
      document.addEventListener(event, listener, getOptions(event));
    });
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, listener, getOptions(event));
      });
    };
  }, [!handler]);
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );
  const observer = () => (ro.observe(ref.current), ro.disconnect);
  useEffect(() => {
    observer();
    return () => observer();
  }, []);
  return [{ ref }, bounds];
}

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
