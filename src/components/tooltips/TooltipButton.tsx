import React, { useRef, useState } from "react";
import { useEventListener } from "../../hooks/useEventListener";
import { Coordinates } from "../../types/coordinates";
import { Portal } from "../wrappers/Portal";
import TooltipPopover from "./TooltipPopover";

type TooltipButtonProps = {
  wording: string;
  content: React.ReactNode;
};

export const TooltipButton = ({
  wording,
  content,
}: TooltipButtonProps): JSX.Element => {
  // takes current button coordinates
  const [coords, setCoords] = useState<Coordinates>({ left: 0, top: 0 });
  const [isTooltipToggled, setIsTooltipToggled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateTooltipCoordinates = (button: HTMLButtonElement): void => {
    const rect = button.getBoundingClientRect();
    console.log("left", rect.x + rect.width / 2);
    console.log("top", rect.y + window.scrollY);
    setCoords({
      left: rect.x + rect.width / 2,
      top: rect.y + window.scrollY,
    });
  };

  const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    updateTooltipCoordinates(event.target as HTMLButtonElement);
    setIsTooltipToggled(!isTooltipToggled);
  };

  useEventListener("resize", () =>
    updateTooltipCoordinates(buttonRef.current!)
  );

  return (
    <div>
      <button onClick={handleClick} ref={buttonRef}>
        {wording}
      </button>
      {isTooltipToggled && (
        <Portal>
          <TooltipPopover coordinates={coords} content={content} />
        </Portal>
      )}
    </div>
  );
};
