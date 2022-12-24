import { useEffect, useRef } from "react";

export const useEventListener = (
  eventType: keyof GlobalEventHandlersEventMap,
  callback: (event?: Event) => void,
  element: Window | Document | Element | null = window
) => {
  const callbackRef = useRef(callback);

  // to make sure we don't have any additional re-renders we don't need
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => {
      if (element == null) return;
      return element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};
