import { useEffect, useRef } from "react";

type EventCallback<E extends Event = Event> = (event: E) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: EventCallback
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useClickOutside;
