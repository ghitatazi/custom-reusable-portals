import styles from "../../styles/TooltipPopover.module.css";
import { Coordinates } from "../../types/coordinates";

type TooltipPopoverProps = {
  content: React.ReactNode;
  coordinates: Coordinates;
};

const TooltipPopover: React.FC<TooltipPopoverProps> = ({
  content,
  coordinates,
}) => {
  return (
    <div className={styles.popover} style={coordinates}>
      <div role="tooltip">{content}</div>
    </div>
  );
};

export default TooltipPopover;
