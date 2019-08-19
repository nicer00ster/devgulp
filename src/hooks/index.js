import { useEffect, useState, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  return {
    value,
    setValue,
    reset: () => {
      setValue("");
      setError(false);
    },
    setError: err => setError(err),
    bind: {
      value,
      onChange: e => {
        setValue(e.target.value);
      }
    },
    hasError: error
  };
};

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));
  useEffect(() => (ro.observe(ref.current), ro.disconnect), []);
  return [{ ref }, bounds]
}
