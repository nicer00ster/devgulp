import {useEffect, useRef, useState} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

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

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler],
    );
}

export function useMeasure() {
    const ref = useRef();
    const [bounds, set] = useState({left: 0, top: 0, width: 0, height: 0});
    const [ro] = useState(
        () => new ResizeObserver(([entry]) => set(entry.contentRect)),
    );
    const observer = () => (ro.observe(ref.current), ro.disconnect);
    useEffect(() => {
        observer();
        return () => observer();
    }, []);
    return [{ref}, bounds];
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
