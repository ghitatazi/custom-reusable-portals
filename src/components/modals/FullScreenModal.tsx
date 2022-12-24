import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useEventListener } from "../../hooks/useEventListener";
import styles from "../../styles/FullScreenModal.module.css";
import { Coordinates } from "../../types/coordinates";

type FullScreenModalProps = {
  content: React.ReactNode;
  hide: () => void;
  enableScrolling?: boolean;
};

export const FullScreenModal = ({
  content,
  hide,
  enableScrolling = false,
}: FullScreenModalProps) => {
  const [modalCoordinates, setModalCoordinates] = useState<Coordinates>({
    left: 0,
    top: 0,
  });
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, hide);

  const updateCoords = useCallback(() => {
    setModalCoordinates({
      left: window.pageXOffset,
      top: window.pageYOffset,
    });
  }, []);

  !!enableScrolling && useEventListener("scroll", updateCoords);

  useEffect(() => {
    updateCoords();
    if (!enableScrolling) {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hide();
  };

  return (
    <div className={styles.modal} style={modalCoordinates}>
      <div className={styles.content}>
        <div className={styles.popUp} ref={popupRef}>
          {content}
          <button className={styles.cross} onClick={(e) => handleCloseModal(e)}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};
