import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = { children?: React.ReactNode };

export const Portal: React.FC<Props> = ({ children }) => {
  const mount = document.getElementById("portal-root")!;
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};
