import React, {
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

type CustomPortal = {
  render:
    | (({ children }: { children?: React.ReactNode }) => ReactPortal)
    | (() => null);
  remove: () => boolean | null;
};

type UsePortalProps = {
  containerId: string;
  defaultShow?: boolean;
  onShow?: () => void;
  onHide?: () => void;
};

const createEl = (id: string): HTMLDivElement => {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  document.body.appendChild(el);

  return el;
};

export const usePortal = ({
  containerId,
  defaultShow = false,
  onShow,
  onHide,
}: UsePortalProps) => {
  const [displayPortal, setDisplayPortal] = useState<boolean>(defaultShow);
  const [portal, setPortal] = useState<CustomPortal>({
    render: () => null,
    remove: () => null,
  });

  const container = useMemo(
    () =>
      (document.getElementById(containerId) as HTMLDivElement) ||
      createEl(containerId),
    []
  );

  const createPortal = useCallback((el: HTMLElement): CustomPortal => {
    const Portal = ({ children }: { children?: React.ReactNode }) =>
      ReactDOM.createPortal(children, el);

    // Note: unmountComponentAtNode deprecated in React 18, to replace with root.unmount()
    const remove = () => ReactDOM.unmountComponentAtNode(el);

    return { render: Portal, remove };
  }, []);

  useEffect(() => {
    // if there is an existing portal, remove it. It prevents memory leaks
    if (container) portal.remove();

    // otherwise, create a new portal and render it
    const newPortal = createPortal(container);
    setPortal(newPortal);

    // when the user exits the page, delete the portal from memory
    return () => {
      newPortal.remove();
    };
  }, [container]);

  const show = useCallback(() => {
    setDisplayPortal(true);
    if (onShow instanceof Function) onShow();
  }, [setDisplayPortal, onShow]);

  const hide = useCallback(() => {
    setDisplayPortal(false);
    if (onHide instanceof Function) onHide();
  }, [setDisplayPortal, onHide]);

  return { Portal: portal.render, displayPortal, show, hide };
};
