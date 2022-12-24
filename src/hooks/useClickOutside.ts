import { Ref, RefObject, useEffect, useRef } from "react";
import { useEventListener } from "./useEventListener";

export const useClickOutside = (
  elementRef: RefObject<Element | null>,
  callback: (event?: Event) => void
) => {
  useEventListener(
    "click",
    (event?: Event) => {
      const target = event?.target as Node;
      if (
        elementRef.current === null ||
        (target && elementRef.current.contains(target))
      )
        return;
      callback(event);
    },
    document
  );
};
