import { useEffect, useRef } from "react";

type EventCallback<E extends Event = Event> = (event: E) => void;

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: EventCallback<DocumentEventMap[K]>,
  options?: EventListenerOptions
) {
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current?.(event);

    if (typeof window !== "undefined") {
      window.addEventListener(eventName, eventListener, options);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(eventName, eventListener, options);
      }
    };
  }, [eventName, options]);
}

export default useEventListener;
