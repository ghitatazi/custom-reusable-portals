import { useCallback } from "react";
import { usePortal } from "../../hooks/usePortal";
import { FullScreenModal } from "./FullScreenModal";

type ShowModalButtonProps = {
  wording: string;
  content: React.ReactNode;
};

export const ShowModalButton = ({ wording, content }: ShowModalButtonProps) => {
  const { Portal, displayPortal, show, hide } = usePortal({
    containerId: "portal-root",
  });

  const handleShowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      show();
    },
    []
  );

  return (
    <div>
      {displayPortal && (
        <Portal>
          <FullScreenModal content={content} hide={hide} />
        </Portal>
      )}
      <button onClick={handleShowClick}>{wording}</button>
    </div>
  );
};
